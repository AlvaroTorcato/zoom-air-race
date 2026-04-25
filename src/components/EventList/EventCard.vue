<script setup>
import { useEventSelection } from '@/composables/useEventSelection'

const props = defineProps({
  event: Object
})

const { hoveredId, selectedId, setHovered, setSelected } = useEventSelection()
</script>

<template>
  <div
    class="event-card"
    :class="{ 'is-hovered': hoveredId === event.id, 'is-selected': selectedId === event.id }"
    @mouseenter="setHovered(event.id)"
    @mouseleave="setHovered(null)"
    @click="setSelected(event.id)"
  >
    <span class="category-badge">{{ event.category }}</span>
    <h3>{{ event.title }}</h3>
    <p>{{ event.description }}</p>
    <small>{{ event.address }}, {{ event.country }}</small>
  </div>
</template>

<style scoped>
.event-card {
  padding: 12px 16px;
  border-radius: 6px;
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: background-color 0.15s, border-color 0.15s;
}

.event-card.is-hovered {
  background-color: var(--color-background-mute, #f5f5f5);
}

.event-card.is-selected {
  background-color: var(--color-background-soft, #eef0f4);
  border-left-color: var(--color-primary, #4080c0);
}

.category-badge {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 2px 6px;
  border-radius: 3px;
  background-color: var(--color-primary, #4080c0);
  color: #fff;
}

h3 {
  margin: 6px 0 4px;
  font-size: 1rem;
}

p {
  margin: 0 0 4px;
  font-size: 0.875rem;
  color: var(--color-text-soft, #555);
}

small {
  font-size: 0.75rem;
  color: var(--color-text-muted, #888);
}
</style>