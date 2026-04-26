# Select Event from Map

**Status**: Done

## Story

As a visitor, I want to click a map marker to select that event, so that I can see its details in the list without searching manually.

## Acceptance Criteria

- [ ] Clicking a marker selects the event and shows a popup with title and description
- [ ] The matching card in the list receives the selected visual state
- [ ] The list scrolls to bring the selected card into view

## Notes

`EventMarker` listens for the Leaflet `click` event and calls `setSelected(event.id)`. `EventList` watches `selectedId` and scrolls the matching card into view (see US-08).
