<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import L from 'leaflet'
import { useEventSelection } from '@/composables/useEventSelection'
import EventMarker from './EventMarker.vue'

const { filteredEvents, selectedId } = useEventSelection()

const mapEl = ref(null)
let leafletMap

onMounted(() => {
  leafletMap = L.map(mapEl.value).setView([48.0, 16.0], 4)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(leafletMap)
})

onUnmounted(() => leafletMap.remove())

watch(selectedId, (id) => {
  if (!id) return
  const event = filteredEvents.value.find(e => e.id === id)
  if (event) leafletMap.flyTo([event.coordinates.lat, event.coordinates.lng], 8)
})
</script>

<template>
  <div ref="mapEl" class="map-container">
    <EventMarker
      v-for="event in filteredEvents"
      :key="event.id"
      :event="event"
      :map="leafletMap"
    />
  </div>
</template>

<style scoped>
.map-container {
  height: 100%;
}
</style>