# Deselect an Event

**Status**: Done

## Story

As a visitor, I want to click a selected event again to deselect it, so that I can return to the neutral overview without having to select a different event.

## Acceptance Criteria

- [ ] Clicking the already-selected card clears the selection
- [ ] Clicking the already-selected marker clears the selection
- [ ] Map and list both return to their default (unselected) appearance after deselection

## Notes

`setSelected` in `useEventSelection` toggles: if the incoming id equals `selectedId.value`, it sets `selectedId` to `null`.
