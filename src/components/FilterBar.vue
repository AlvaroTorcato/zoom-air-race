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
  gap: 0.5rem;
}

.filter-bar button {
  padding: 0.4rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 0.9rem;
}

.filter-bar button.active {
  background: #1a73e8;
  color: #fff;
  border-color: #1a73e8;
}
</style>