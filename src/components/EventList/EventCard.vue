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
    <div class="card-top">
      <span class="category-badge">{{ event.category }}</span>
      <span v-if="selectedId === event.id" class="selected-indicator">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="4" fill="currentColor"/>
        </svg>
        On map
      </span>
    </div>
    <h3>{{ event.title }}</h3>
    <p>{{ event.description }}</p>
    <small>{{ event.address }}, {{ event.country }}</small>
  </div>
</template>

<style scoped>
.event-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  border-radius: var(--z-radius-md);
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: background-color var(--z-transition), border-color var(--z-transition),
              box-shadow var(--z-transition), transform var(--z-transition);
}

.event-card.is-hovered {
  background-color: var(--color-background-soft);
  transform: translateX(2px);
}

.event-card.is-selected {
  background-color: rgba(255, 106, 0, 0.06);
  border-left: 4px solid var(--z-orange);
  box-shadow: var(--z-shadow-md), inset 0 0 0 1px rgba(255, 106, 0, 0.12);
  transform: translateX(3px);
  animation: card-select 0.25s ease;
}

@keyframes card-select {
  0%   { background-color: rgba(255, 106, 0, 0.18); }
  100% { background-color: rgba(255, 106, 0, 0.06); }
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.category-badge {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 999px;
  background-color: var(--z-orange);
  color: var(--z-white);
}

.selected-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--z-orange);
  animation: fade-in 0.2s ease;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateX(-4px); }
  to   { opacity: 1; transform: translateX(0); }
}

h3 {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-heading);
  letter-spacing: -0.01em;
  line-height: 1.3;
}

p {
  font-size: 0.84rem;
  color: var(--color-text-soft);
  line-height: 1.5;
}

small {
  font-size: 0.74rem;
  color: var(--color-text-muted);
  letter-spacing: 0.01em;
}
</style>