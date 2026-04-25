import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'

vi.mock('leaflet', () => ({
  default: {
    map: vi.fn(() => ({
      setView: vi.fn().mockReturnThis(),
      addLayer: vi.fn().mockReturnThis(),
      remove: vi.fn(),
      flyTo: vi.fn()
    })),
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

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders FilterBar', () => {
    const wrapper = mount(App, { global: { stubs: { EventMarker: true } } })
    expect(wrapper.findComponent({ name: 'FilterBar' }).exists()).toBe(true)
  })

  it('renders EventMap', () => {
    const wrapper = mount(App, { global: { stubs: { EventMarker: true } } })
    expect(wrapper.findComponent({ name: 'EventMap' }).exists()).toBe(true)
  })

  it('renders EventList', () => {
    const wrapper = mount(App, { global: { stubs: { EventMarker: true } } })
    expect(wrapper.findComponent({ name: 'EventList' }).exists()).toBe(true)
  })

  it('clicking Category A reduces EventCard count to only category-A events', async () => {
    const wrapper = mount(App, { global: { stubs: { EventMarker: true } } })
    const totalCount = wrapper.findAllComponents({ name: 'EventCard' }).length

    const filterButtons = wrapper.findAll('nav.filter-bar button')
    const categoryAButton = filterButtons.find(b => b.text() === 'Category A')
    await categoryAButton.trigger('click')
    await nextTick()

    const filteredCards = wrapper.findAllComponents({ name: 'EventCard' })
    expect(filteredCards.length).toBeLessThan(totalCount)
    expect(filteredCards.length).toBeGreaterThan(0)
  })
})