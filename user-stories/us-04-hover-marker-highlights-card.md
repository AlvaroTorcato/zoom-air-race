# Hover Marker Highlights Card

**Status**: Done

## Story

As a visitor, I want to hover over a map marker and see its event card highlight in the list, so that I can identify the event without scrolling manually.

## Acceptance Criteria

- [ ] Hovering a map marker applies the hover state to the matching list card
- [ ] Moving the mouse off the marker removes the card hover state
- [ ] Only one card is highlighted at a time

## Notes

`EventMarker` listens for Leaflet `mouseover` / `mouseout` events and calls `setHovered`. `EventCard` binds `.is-hovered` class based on `hoveredId === event.id`.
