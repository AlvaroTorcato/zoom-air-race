# Interactive Map Navigation

**Status**: Done

## Story

As a visitor, I want to pan and zoom the map freely, so that I can explore event locations at my own pace and level of detail.

## Acceptance Criteria

- [ ] Map supports mouse drag to pan
- [ ] Map supports scroll-wheel zoom and pinch-to-zoom on touch devices
- [ ] Selecting an event (fly-to) does not permanently lock pan or zoom controls
- [ ] Map tiles load from OpenStreetMap with no API key required

## Notes

Leaflet provides pan/zoom out of the box. `flyTo` is a one-shot animation; controls are re-enabled immediately afterward.
