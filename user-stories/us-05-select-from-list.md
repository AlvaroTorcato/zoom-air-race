# Select Event from List

**Status**: Done

## Story

As a visitor, I want to click an event card in the list to select it, so that the map centers on that location and I can inspect it in detail.

## Acceptance Criteria

- [ ] Clicking a card marks it as selected (stronger highlight + left border accent)
- [ ] The map flies to the selected event's coordinates at zoom 8
- [ ] The selected state persists until the user deselects or picks a different event

## Notes

`EventCard` calls `setSelected(event.id)` on click. `EventMap` watches `selectedId` and calls `leafletMap.flyTo(coords, 8)`. See also US-07 for deselect behaviour.
