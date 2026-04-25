<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import L from 'leaflet'
import { useEventSelection } from '@/composables/useEventSelection'

const props = defineProps({
  event: Object,
  map: Object,
})

const { hoveredId, selectedId, setHovered, setSelected } = useEventSelection()

const defaultIcon = L.divIcon({ className: 'marker-default', iconSize: [12, 12] })
const highlightedIcon = L.divIcon({ className: 'marker-highlighted', iconSize: [16, 16] })

let marker

const createMarker = () => {
  if (!props.map || marker) return
  marker = L.marker([props.event.coordinates.lat, props.event.coordinates.lng])
      .addTo(props.map)
      .on('mouseover', () => setHovered(props.event.id))
      .on('mouseout', () => setHovered(null))
      .on('click', () => setSelected(props.event.id))
  marker.bindPopup(`<strong>${props.event.title}</strong><p>${props.event.description}</p>`)
  const isActive = hoveredId.value === props.event.id || selectedId.value === props.event.id
  marker.setIcon(isActive ? highlightedIcon : defaultIcon)
}

onMounted(() => {
  createMarker()
})

watch(() => props.map, () => {
  createMarker()
})

onUnmounted(() => {
  if (marker) marker.remove()
})

watch(() => [hoveredId.value, selectedId.value], () => {
  if (!marker) return
  const isActive = hoveredId.value === props.event.id || selectedId.value === props.event.id
  marker.setIcon(isActive ? highlightedIcon : defaultIcon)
})
</script>

<template>
</template>

<style>
/* Nota: Mantemos sem scoped para o Leaflet detetar as classes */

.marker-default {
  background-color: #3b82f6;
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.4);
  transition: background-color 0.2s, width 0.2s, height 0.2s, margin 0.2s;
}

.marker-highlighted {
  background-color: #ef4444;
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0,0,0,0.6);
  z-index: 1000 !important;
  transition: background-color 0.2s, width 0.2s, height 0.2s, margin 0.2s;
}
</style>