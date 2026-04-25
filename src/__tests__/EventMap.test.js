import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import EventMap from '@/components/EventMap/EventMap.vue'

const mapInstance = vi.hoisted(() => ({
  setView: vi.fn().mockReturnThis(),
  addLayer: vi.fn().mockReturnThis(),
  remove: vi.fn(),
  flyTo: vi.fn()
}))

vi.mock('leaflet', () => ({
  default: {
    map: vi.fn(() => mapInstance),
    tileLayer: vi.fn(() => ({ addTo: vi.fn().mockReturnThis() })),
    marker: vi.fn(() => ({
      addTo: vi.fn().mockReturnThis(),
      on: vi.fn().mockReturnThis(),
      bindPopup: vi.fn().mockReturnThis(),
      setIcon: vi.fn()
    })),
    divIcon: vi.fn(() => ({}))
  }
}))

vi.mock('@/composables/useEventSelection', async () => {
  const { ref } = await import('vue')
  const selectedId = ref(null)
  const filteredEvents = ref([
    { id: 'e1', title: 'Race 1', description: 'D', coordinates: { lat: 48.8566, lng: 2.3522 }, category: 'A' },
    { id: 'e2', title: 'Race 2', description: 'D', coordinates: { lat: 51.5, lng: -0.09 }, category: 'B' }
  ])
  return {
    useEventSelection: () => ({
      filteredEvents,
      selectedId,
      hoveredId: ref(null),
      setHovered: vi.fn(),
      setSelected: vi.fn()
    }),
    testRefs: { selectedId, filteredEvents }
  }
})

import L from 'leaflet'
import { testRefs } from '@/composables/useEventSelection'

describe('EventMap', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mapInstance.setView.mockReturnThis()
    testRefs.selectedId.value = null
  })

  it('calls L.map on mount', () => {
    mount(EventMap, { global: { stubs: { EventMarker: true } } })
    expect(L.map).toHaveBeenCalled()
  })

  it('renders one EventMarker per event in filteredEvents', () => {
    const wrapper = mount(EventMap, { global: { stubs: { EventMarker: true } } })
    expect(wrapper.findAllComponents({ name: 'EventMarker' }).length).toBe(2)
  })

  it('calls leafletMap.remove on unmount', () => {
    const wrapper = mount(EventMap, { global: { stubs: { EventMarker: true } } })
    wrapper.unmount()
    expect(mapInstance.remove).toHaveBeenCalled()
  })

  it('flies to selected event coordinates when selectedId changes', async () => {
    mount(EventMap, { global: { stubs: { EventMarker: true } } })
    testRefs.selectedId.value = 'e1'
    await nextTick()
    expect(mapInstance.flyTo).toHaveBeenCalledWith([48.8566, 2.3522], 8)
  })
})