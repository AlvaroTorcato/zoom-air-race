<script setup>
import { ref, watch, nextTick } from 'vue'
import EventCard from './EventCard.vue'
import { useEventSelection } from '@/composables/useEventSelection'

const { filteredEvents, selectedId } = useEventSelection()
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
    <p v-if="filteredEvents.length === 0" class="empty-state">
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
  gap: 4px;
  padding: 4px;
}

.empty-state {
  padding: 16px;
  text-align: center;
  color: var(--color-text-muted, #888);
}
</style>