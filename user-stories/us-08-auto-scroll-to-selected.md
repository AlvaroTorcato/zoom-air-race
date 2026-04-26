# Auto-Scroll List to Selected Event

**Status**: Done

## Story

As a visitor, I want the list to automatically scroll to a selected event card, so that I can see its details even if it was off-screen when I clicked the map.

## Acceptance Criteria

- [ ] When a selection is made (from map or list), the list scrolls the matching card into view
- [ ] The scroll is smooth (animated), not an abrupt jump
- [ ] Cards that are already fully in view are not unnecessarily scrolled

## Notes

`EventList` watches `selectedId`. On change it calls `el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })` on the matching card element. `block: 'nearest'` prevents scrolling when the card is already visible.
