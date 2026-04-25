import { ref, computed } from 'vue'

const hoveredId = ref(null)
const selectedId = ref(null)
const activeCategory = ref(null)

let filteredEvents = null

export function useEventSelection(events) {
  if (events) {
    filteredEvents = computed(() =>
      activeCategory.value
        ? events.value.filter(e => e.category === activeCategory.value)
        : events.value
    )
  }

  function setHovered(id) { hoveredId.value = id }
  function setSelected(id) {
    selectedId.value = selectedId.value === id ? null : id
  }
  function setCategory(cat) { activeCategory.value = cat }

  return { filteredEvents, activeCategory, hoveredId, selectedId, setHovered, setSelected, setCategory }
}