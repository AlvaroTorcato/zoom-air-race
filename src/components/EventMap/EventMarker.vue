<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import L from 'leaflet'
import { useEventSelection } from '@/composables/useEventSelection'

const props = defineProps({
  event: Object,
  map: Object,
})

const { hoveredId, selectedId, setHovered, setSelected } = useEventSelection()

const defaultIcon = L.divIcon({ className: 'marker-default', iconSize: [14, 14] })
const highlightedIcon = L.divIcon({ className: 'marker-highlighted', iconSize: [18, 18] })

let marker

const createMarker = () => {
  if (!props.map || marker) return
  const isActive = hoveredId.value === props.event.id || selectedId.value === props.event.id
  marker = L.marker([props.event.coordinates.lat, props.event.coordinates.lng], {
    icon: isActive ? highlightedIcon : defaultIcon
  })
      .addTo(props.map)
      .on('mouseover', () => setHovered(props.event.id))
      .on('mouseout', () => setHovered(null))
      .on('click', () => setSelected(props.event.id))
  const { category, title, description, address, country } = props.event
  marker.bindPopup(`
    <div class="z-popup">
      <span class="z-popup-badge">Cat. ${category}</span>
      <strong class="z-popup-title">${title}</strong>
      <p class="z-popup-desc">${description}</p>
      <span class="z-popup-loc">&#9679; ${address}, ${country}</span>
    </div>
  `, { maxWidth: 240, className: 'z-popup-wrapper' })
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


.z-popup-wrapper .leaflet-popup-content-wrapper {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15), 0 2px 6px rgba(0, 0, 0, 0.08);
  padding: 0;
  overflow: hidden;
  border-top: 3px solid #ff6a00;
}

.z-popup-wrapper .leaflet-popup-content {
  margin: 0;
  line-height: 1;
}

.z-popup-wrapper .leaflet-popup-tip {
  background: #fff;
  box-shadow: none;
}

.z-popup-wrapper .leaflet-popup-close-button {
  color: #888;
  font-size: 18px;
  top: 6px;
  right: 8px;
  width: 20px;
  height: 20px;
  line-height: 20px;
}

.z-popup-wrapper .leaflet-popup-close-button:hover {
  color: #ff6a00;
}

.z-popup {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 12px 14px 11px;
  font-family: Inter, -apple-system, sans-serif;
  min-width: 180px;
}

.z-popup-badge {
  display: inline-block;
  align-self: flex-start;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 2px 7px;
  border-radius: 999px;
  background: #ff6a00;
  color: #fff;
  line-height: 1.6;
}

.z-popup-title {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  color: #0d0d0d;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.z-popup-desc {
  font-size: 0.8rem;
  color: #444;
  line-height: 1.45;
  margin: 0;
}

.z-popup-loc {
  font-size: 0.7rem;
  color: #888;
  letter-spacing: 0.01em;
}

.marker-default {
  background-color: #ff6a00;
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(255, 106, 0, 0.5);
  transition: background-color 0.2s, width 0.2s, height 0.2s, margin 0.2s, box-shadow 0.2s;
}

.marker-highlighted {
  background-color: #d95800;
  border: 2.5px solid white;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(217, 88, 0, 0.7);
  z-index: 1000 !important;
  transition: background-color 0.2s, width 0.2s, height 0.2s, margin 0.2s, box-shadow 0.2s;
}
</style>