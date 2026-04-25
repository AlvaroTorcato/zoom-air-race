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

onMounted(() => {
  marker = L.marker([props.event.coordinates.lat, props.event.coordinates.lng])
    .addTo(props.map)
    .on('mouseover', () => setHovered(props.event.id))
    .on('mouseout', () => setHovered(null))
    .on('click', () => setSelected(props.event.id))
  marker.bindPopup(`<strong>${props.event.title}</strong><p>${props.event.description}</p>`)
})

onUnmounted(() => marker.remove())

watch([hoveredId, selectedId], () => {
  if (!marker) return
  const isActive = hoveredId.value === props.event.id || selectedId.value === props.event.id
  marker.setIcon(isActive ? highlightedIcon : defaultIcon)
})
</script>