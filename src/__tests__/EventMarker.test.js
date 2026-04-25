import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import EventMarker from '@/components/EventMap/EventMarker.vue'

const markerInstance = vi.hoisted(() => ({
  addTo: vi.fn().mockReturnThis(),
  on: vi.fn().mockReturnThis(),
  bindPopup: vi.fn().mockReturnThis(),
  setIcon: vi.fn().mockReturnThis(),
  remove: vi.fn()
}))

const mockSetHovered = vi.hoisted(() => vi.fn())
const mockSetSelected = vi.hoisted(() => vi.fn())

vi.mock('leaflet', () => ({
  default: {
    marker: vi.fn(() => markerInstance),
    divIcon: vi.fn(() => ({}))
  }
}))

vi.mock('@/composables/useEventSelection', () => ({
  useEventSelection: () => ({
    hoveredId: { value: null },
    selectedId: { value: null },
    setHovered: mockSetHovered,
    setSelected: mockSetSelected
  })
}))

import L from 'leaflet'

const fixture = {
  id: 'e1',
  title: 'Race 1',
  description: 'Fast race',
  coordinates: { lat: 48.8566, lng: 2.3522 }
}

const mockMap = {}

describe('EventMarker', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    markerInstance.addTo.mockReturnThis()
    markerInstance.on.mockReturnThis()
    markerInstance.bindPopup.mockReturnThis()
    markerInstance.setIcon.mockReturnThis()
  })

  it('calls L.marker with event coordinates on mount', () => {
    mount(EventMarker, { props: { event: fixture, map: mockMap } })
    expect(L.marker).toHaveBeenCalledWith([fixture.coordinates.lat, fixture.coordinates.lng])
  })

  it('adds marker to the map on mount', () => {
    mount(EventMarker, { props: { event: fixture, map: mockMap } })
    expect(markerInstance.addTo).toHaveBeenCalledWith(mockMap)
  })

  it('binds popup with content containing event title', () => {
    mount(EventMarker, { props: { event: fixture, map: mockMap } })
    const popup = markerInstance.bindPopup.mock.calls[0][0]
    expect(popup).toContain(fixture.title)
  })

  it('mouseover event triggers setHovered with event id', () => {
    mount(EventMarker, { props: { event: fixture, map: mockMap } })
    const [, handler] = markerInstance.on.mock.calls.find(([e]) => e === 'mouseover')
    handler()
    expect(mockSetHovered).toHaveBeenCalledWith(fixture.id)
  })

  it('click event triggers setSelected with event id', () => {
    mount(EventMarker, { props: { event: fixture, map: mockMap } })
    const [, handler] = markerInstance.on.mock.calls.find(([e]) => e === 'click')
    handler()
    expect(mockSetSelected).toHaveBeenCalledWith(fixture.id)
  })

  it('removes marker on component unmount', () => {
    const wrapper = mount(EventMarker, { props: { event: fixture, map: mockMap } })
    wrapper.unmount()
    expect(markerInstance.remove).toHaveBeenCalled()
  })
})