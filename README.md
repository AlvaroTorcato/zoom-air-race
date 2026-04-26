# Zooom Air Race

An Air Race event overview page with a map + list view, category filtering, and bidirectional hover/click sync between the two views. Events are served by a Python REST API backed by PostgreSQL.

## Setup

```sh
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

> The dev server proxies `/api` to `http://localhost:8000`. Start the API first (see below).

```sh
npm run build    # production build
npm run preview  # preview production build locally
```

## REST API

A FastAPI + PostgreSQL backend lives in `api/`. It exposes CRUD endpoints for events.

### Run locally (outside Docker)

```sh
# Start only Postgres
docker compose up -d postgres

# In a separate terminal
cd api
export DATABASE_URL=postgresql://airrace:airrace@localhost:5432/airrace
alembic upgrade head
python -m scripts.seed      # load the 10 sample events (idempotent)
uvicorn app.main:app --reload --port 8000
```

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/events` | List all events. Supports `?category=A\|B` |
| `GET` | `/api/events/{id}` | Get a single event |
| `POST` | `/api/events` | Create an event |
| `PUT` | `/api/events/{id}` | Full replacement update |
| `PATCH` | `/api/events/{id}` | Partial update |
| `DELETE` | `/api/events/{id}` | Delete an event |

Interactive docs (Swagger UI) are available at [http://localhost:8000/docs](http://localhost:8000/docs) when the API is running.

### Postman collection

Import `api/zooom-air-race.postman_collection.json` into Postman. The collection uses a `baseUrl` variable (default `http://localhost:8000`) and includes a request for every endpoint.

## Docker

Starts Postgres, the Python API, and the Vue frontend together:

```sh
docker compose up -d --build
docker compose exec api python -m scripts.seed   # first run only
```

| Service | URL |
|---------|-----|
| Frontend | [http://localhost](http://localhost) |
| API | [http://localhost:8000](http://localhost:8000) |
| API docs | [http://localhost:8000/docs](http://localhost:8000/docs) |

To stop (keeps the database volume):

```sh
docker compose down
```

## Testing

```sh
npm test         # watch mode
npm run test:run # run once (CI)
```

Test files live in `src/__tests__/`. Leaflet-dependent components (`EventMap`, `EventMarker`) require a manual mock, see `src/__mocks__/leaflet.js`.

## Architecture

Vue 3 + Vite + Leaflet frontend, FastAPI + PostgreSQL backend.

```
src/
├── assets/            # Global CSS (base.css, main.css)
├── components/
│   ├── EventList/
│   │   ├── EventList.vue   # Scrollable list container
│   │   └── EventCard.vue   # Single event card with hover/selection state
│   ├── EventMap/
│   │   ├── EventMap.vue    # Leaflet map container
│   │   └── EventMarker.vue # Single Leaflet marker (renderless)
│   └── FilterBar.vue       # Category filter buttons
├── composables/
│   ├── useEvents.js         # Data layer: fetches from /api/events
│   └── useEventSelection.js # Shared state: hover, selected, filter
├── data/
│   └── events.json          # Reference data (used by seed script)
├── App.vue            # Layout root; wires useEvents → useEventSelection
└── main.js            # Entry point

api/
├── app/
│   ├── main.py        # FastAPI app, CORS, router mount
│   ├── models.py      # SQLAlchemy Event model
│   ├── schemas.py     # Pydantic request/response schemas
│   ├── crud.py        # DB operations
│   ├── database.py    # Engine and session dependency
│   └── routers/
│       └── events.py  # All /api/events endpoints
├── alembic/           # Database migrations
├── scripts/
│   └── seed.py        # One-shot idempotent seed
└── Dockerfile
```

### State Design Pattern

All interaction state (hover, selection, category filter) lives in `useEventSelection`. Refs are declared at module level so every component shares the same singleton instance.

`App.vue` is the only place `useEvents` is called. It passes the `events` ref into `useEventSelection` once.

All child components call `useEventSelection()` without arguments to read the shared state. `filteredEvents` is a computed ref derived from `events + activeCategory`, so filter changes propagate automatically to both the map and the list.

## Technical Decisions

### Composable singleton for shared state

The central challenge is bidirectional sync between two sibling components, `EventMap` and `EventList`, that must always reflect the same hover, selection, and filter state.

The solution is a **module-level singleton composable** (`useEventSelection`). Refs are declared at module scope, so every component that calls `useEventSelection()` receives the same reactive objects.

```
hoveredId (ref)        ← written by EventCard.mouseenter / EventMarker.mouseover
selectedId (ref)       ← written by EventCard.click / EventMarker.click
activeCategory (ref)   ← written by FilterBar.click
filteredEvents (computed) ← derived from events + activeCategory; read by both views
```

### Renderless EventMarker component

`EventMarker.vue` has no template, it owns a single Leaflet marker and manages its lifecycle entirely via `onMounted` / `onUnmounted` / `watch`. This keeps `EventMap`'s template clean (`v-for="event in filteredEvents"`) and lets Vue's reconciliation handle marker add/remove automatically when the filter changes.

### Leaflet over Google Maps / Mapbox

OpenStreetMap tiles require no API key. The project runs out of the box after `npm install` with zero credentials or environment variables.

### Static JSON as the data source

`useEvents.js` is the only abstraction between the UI and the data origin, it imports `events.json` and wraps it in a Vue ref. Switching to a real API or headless CMS means replacing only the body of that composable.

No component touches the data source directly, so the rest of the app is unaffected.

### Vue 3 Composition API (`<script setup>`)

All components use `<script setup>` for minimal boilerplate. Composables are plain functions that return reactive refs, they are easy to unit-test in isolation without mounting a component.

## What I Would Improve With More Time

### URL-driven state

Currently refreshing the page loses the active filter and selection. Encoding `?category=A&selected=evt-007` in the query string would make views shareable and bookmarkable. `useEventSelection` is the only place that would need to read from and write to `window.location`, no component changes required.

### Better UI

Show an event detail panel (date, pilot count, distance) when a card or marker is selected. Add a `date` field to `events.json` and sort the list chronologically. Cluster overlapping markers at low zoom levels with `Leaflet.markercluster`.

### Handling a high number of events

The current implementation renders every event simultaneously, all list cards in the DOM and one Leaflet marker per event. This works fine for the current dataset but degrades with hundreds or thousands of events.

**List:** Replace the flat render in `EventList.vue` with a virtual scroller (e.g. `vue-virtual-scroller`) so only the visible cards are mounted. The component interface (`filteredEvents`, hover/selection callbacks) stays the same.

**Map:** Enable marker clustering via `Leaflet.markercluster`. `EventMarker.vue` would add itself to a cluster group layer instead of directly to the map, keeping the marker-per-component model intact.

**Data:** If events come from an API, `useEvents.js` would switch to paginated or viewport-bounded fetching rather than loading the full dataset upfront.