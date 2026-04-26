<script setup>
import { ref, watch, nextTick } from 'vue'
import EventCard from './EventCard.vue'
import { useEventSelection } from '@/composables/useEventSelection'
import { useEvents } from '@/composables/useEvents'

const { filteredEvents, selectedId, activeCategory } = useEventSelection()
const { loading } = useEvents()
const listEl = ref(null)

watch(selectedId, async (id) => {
  if (!id || !listEl.value) return
  await nextTick()
  const el = listEl.value.querySelector(`[data-event-id="${id}"]`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
})
</script>

<template>
  <div ref="listEl" class="event-list">
    <EventCard
      v-for="event in filteredEvents"
      :key="event.id"
      :event="event"
      :data-event-id="event.id"
    />
    <p v-if="!loading && filteredEvents.length === 0 && !activeCategory" class="empty-state">
      No data from the API.
    </p>
    <p v-else-if="filteredEvents.length === 0 && activeCategory" class="empty-state">
      No events for this category.
    </p>
  </div>
</template>

<style scoped>
.event-list {
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 8px;
  background: var(--color-background);
}

.event-list > * + * {
  border-top: 1px solid var(--color-border);
}

.empty-state {
  padding: 24px 16px;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}
</style>