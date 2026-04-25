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
      <h1>Air Race Events</h1>
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
  gap: 1.5rem;
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.app-header h1 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-heading);
  white-space: nowrap;
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