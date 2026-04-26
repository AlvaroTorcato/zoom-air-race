# Category Filtering

**Status**: Done

## Story

As a visitor, I want to filter events by category (All / A / B), so that I can focus on the event tier I care about.

## Acceptance Criteria

- [ ] FilterBar shows three buttons: All, Category A, Category B
- [ ] The active filter button is visually distinguished from inactive ones
- [ ] Selecting a filter immediately updates both the list and the map
- [ ] "All" shows every event; "A" / "B" show only that category

## Notes

Filter state lives in `useEventSelection` (`activeCategory` ref). `filteredEvents` is a computed ref so both map and list react automatically without explicit wiring.
