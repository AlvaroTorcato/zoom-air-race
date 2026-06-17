<script setup>
import { ref, shallowRef, onMounted, onUnmounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEventSelection } from '@/composables/useEventSelection'
import EventMarker from '@/components/EventMap/EventMarker.vue'

const { filteredEvents, selectedId } = useEventSelection()

const mapEl = ref(null)
const leafletMap = shallowRef(null)

onMounted(() => {
  leafletMap.value = L.map(mapEl.value).setView([48.0, 16.0], 4)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(leafletMap.value)
})

onUnmounted(() => {
  if (leafletMap.value) {
    leafletMap.value.remove()
  }
})

watch(selectedId, (id) => {
  if (!id || !leafletMap.value) return

  const event = filteredEvents.value.find(e => e.id === id)
  if (event) {
    leafletMap.value.flyTo([event.coordinates.lat, event.coordinates.lng], 8)
  }
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
  min-height: 400px;
  width: 100%;
}
</style>