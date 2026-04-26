# Hover Card Highlights Marker

**Status**: Done

## Story

As a visitor, I want to hover over an event card in the list and see its map marker highlight, so that I can quickly locate the event on the map.

## Acceptance Criteria

- [ ] Hovering a card changes the corresponding map marker to the highlighted icon (red)
- [ ] Moving the mouse away from the card restores the marker to the default icon (blue)
- [ ] Only one marker is highlighted at a time

## Notes

`EventCard` calls `setHovered(event.id)` on `mouseenter` and `setHovered(null)` on `mouseleave`. `EventMarker` watches `hoveredId` and swaps Leaflet icons accordingly.
