import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import EventCard from '@/components/EventList/EventCard.vue'

const mockSetHovered = vi.fn()
const mockSetSelected = vi.fn()
const mockHoveredId = { value: null }
const mockSelectedId = { value: null }

vi.mock('@/composables/useEventSelection', () => ({
  useEventSelection: () => ({
    get hoveredId() { return mockHoveredId.value },
    get selectedId() { return mockSelectedId.value },
    setHovered: mockSetHovered,
    setSelected: mockSetSelected
  })
}))

const fixture = {
  id: 'e1',
  title: 'Race 1',
  description: 'Desc',
  address: '1 St',
  country: 'France',
  category: 'A'
}

describe('EventCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockHoveredId.value = null
    mockSelectedId.value = null
  })

  it('renders event title, description, category, address and country', () => {
    const wrapper = mount(EventCard, { props: { event: fixture } })
    expect(wrapper.text()).toContain('Race 1')
    expect(wrapper.text()).toContain('Desc')
    expect(wrapper.text()).toContain('A')
    expect(wrapper.text()).toContain('1 St')
    expect(wrapper.text()).toContain('France')
  })

  it('applies is-hovered class when hoveredId equals event.id', async () => {
    mockHoveredId.value = 'e1'
    const wrapper = mount(EventCard, { props: { event: fixture } })
    expect(wrapper.classes()).toContain('is-hovered')
  })

  it('does not apply is-hovered when hoveredId is a different id', async () => {
    mockHoveredId.value = 'e2'
    const wrapper = mount(EventCard, { props: { event: fixture } })
    expect(wrapper.classes()).not.toContain('is-hovered')
  })

  it('applies is-selected class when selectedId equals event.id', async () => {
    mockSelectedId.value = 'e1'
    const wrapper = mount(EventCard, { props: { event: fixture } })
    expect(wrapper.classes()).toContain('is-selected')
  })

  it('mouseenter calls setHovered with event.id', async () => {
    const wrapper = mount(EventCard, { props: { event: fixture } })
    await wrapper.trigger('mouseenter')
    expect(mockSetHovered).toHaveBeenCalledWith('e1')
  })

  it('mouseleave calls setHovered with null', async () => {
    const wrapper = mount(EventCard, { props: { event: fixture } })
    await wrapper.trigger('mouseleave')
    expect(mockSetHovered).toHaveBeenCalledWith(null)
  })

  it('click calls setSelected with event.id', async () => {
    const wrapper = mount(EventCard, { props: { event: fixture } })
    await wrapper.trigger('click')
    expect(mockSetSelected).toHaveBeenCalledWith('e1')
  })
})