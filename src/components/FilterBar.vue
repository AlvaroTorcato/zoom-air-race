<script setup>
import { useEventSelection } from '@/composables/useEventSelection'

const { activeCategory, setCategory } = useEventSelection()

const options = [
  { label: 'All',        value: null },
  { label: 'Category A', value: 'A'  },
  { label: 'Category B', value: 'B'  },
]
</script>

<template>
  <nav class="filter-bar">
    <button
      v-for="option in options"
      :key="String(option.value)"
      :class="{ active: activeCategory === option.value }"
      @click="setCategory(option.value)"
    >
      {{ option.label }}
    </button>
  </nav>
</template>

<style scoped>
.filter-bar {
  display: flex;
  gap: 0.35rem;
}

.filter-bar button {
  padding: 0.3rem 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  background: transparent;
  color: rgba(255, 255, 255, 0.65);
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: background var(--z-transition), color var(--z-transition),
              border-color var(--z-transition), box-shadow var(--z-transition);
}

.filter-bar button:hover {
  background: rgba(255, 255, 255, 0.12);
  color: var(--z-white);
  border-color: rgba(255, 255, 255, 0.45);
}

.filter-bar button.active {
  background: var(--z-orange);
  color: var(--z-white);
  border-color: var(--z-orange);
  box-shadow: 0 2px 10px rgba(255, 106, 0, 0.45);
}
</style>