# Mobile Responsive Layout

**Status**: Done

## Story

As a visitor on a small screen, I want the map and list to stack vertically, so that both panels remain usable without horizontal scrolling.

## Acceptance Criteria

- [ ] On narrow viewports the map occupies approximately 50 vh and the list fills the remaining height
- [ ] Filter bar, map, and list are all accessible without horizontal scroll
- [ ] All interaction features (hover, select, filter) work on touch devices

## Notes

Implemented via a CSS media query on the main grid: below the breakpoint the two-column layout collapses to a single column with `height: 50vh` on the map container and `flex: 1` on the list.
