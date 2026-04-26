# Split Map-and-List View

**Status**: Done

## Story

As a visitor, I want to see air race events on a map and a list side by side, so that I can browse locations and read event details at the same time.

## Acceptance Criteria

- [ ] Map and list panels are both visible simultaneously on desktop
- [ ] List shows all events from the dataset by default
- [ ] Map renders one marker per listed event
- [ ] Panels share the full viewport height with no page scroll

## Notes

Layout: two-column grid (map `1fr`, list `400px` fixed). Both panels stretch to `100vh`. The header (title + FilterBar) sits above the split.
