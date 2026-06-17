<script setup>
import { useEvents } from '@/composables/useEvents'
import { useEventSelection } from '@/composables/useEventSelection'
import FilterBar from '@/components/FilterBar.vue'
import EventMap from '@/components/EventMap/EventMap.vue'
import EventList from '@/components/EventList/EventList.vue'

const { events } = useEvents()
useEventSelection(events)
</script>

<template>
  <div class="app">
    <header class="app-header">
      <div class="header-brand">
        <span class="wordmark">ZOOOM</span>
        <h1>Air Race Events</h1>
      </div>
      <FilterBar />
    </header>
    <main class="split-view">
      <EventMap class="map-panel" />
      <EventList class="list-panel" />
    </main>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0.9rem 1.75rem;
  background: var(--z-gray-900);
  border-bottom: 3px solid var(--z-orange);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
  flex-shrink: 0;
  z-index: 10;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.wordmark {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--z-orange);
  border: 1.5px solid var(--z-orange);
  padding: 0.15rem 0.45rem;
  border-radius: var(--z-radius-sm);
  line-height: 1;
}

.app-header h1 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--z-white);
  white-space: nowrap;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.9;
}

.split-view {
  display: grid;
  grid-template-columns: 1fr 400px;
  flex: 1;
  min-height: 0;
}

.map-panel {
  height: 100%;
}

.list-panel {
  height: 100%;
  overflow-y: auto;
  border-left: 1px solid var(--color-border);
}

@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
  }

  .split-view {
    grid-template-columns: 1fr;
    grid-template-rows: 50vh 1fr;
  }
}
</style>