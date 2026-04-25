import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import EventList from '@/components/EventList/EventList.vue'
import { useEventSelection } from '@/composables/useEventSelection'

const events = [
  { id: 'e1', title: 'Race 1', description: 'Desc 1', address: '1 St', country: 'France', category: 'A' },
  { id: 'e2', title: 'Race 2', description: 'Desc 2', address: '2 St', country: 'UK', category: 'B' }
]

describe('EventList', () => {
  beforeEach(() => {
    const { setCategory } = useEventSelection()
    setCategory(null)
  })

  it('renders one EventCard per event in filteredEvents', () => {
    useEventSelection(ref(events))
    const wrapper = mount(EventList)
    expect(wrapper.findAll('.event-card')).toHaveLength(2)
  })

  it('displays empty-state message when filteredEvents is empty', () => {
    useEventSelection(ref([]))
    const wrapper = mount(EventList)
    expect(wrapper.text()).toContain('No events for this category.')
  })
})