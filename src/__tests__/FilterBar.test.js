import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import FilterBar from '@/components/FilterBar.vue'
import { useEventSelection } from '@/composables/useEventSelection'

beforeEach(() => {
  // Reset activeCategory to null before each test
  const { setCategory } = useEventSelection()
  setCategory(null)
})

describe('FilterBar', () => {
  it('renders buttons labelled "All", "Category A", "Category B"', () => {
    const wrapper = mount(FilterBar)
    const labels = wrapper.findAll('button').map(b => b.text())
    expect(labels).toEqual(['All', 'Category A', 'Category B'])
  })

  it('"All" button has the active class on initial render', () => {
    const wrapper = mount(FilterBar)
    const buttons = wrapper.findAll('button')
    expect(buttons[0].classes()).toContain('active')
    expect(buttons[1].classes()).not.toContain('active')
    expect(buttons[2].classes()).not.toContain('active')
  })

  it('clicking "Category A" applies active to that button and removes it from "All"', async () => {
    const wrapper = mount(FilterBar)
    await wrapper.findAll('button')[1].trigger('click')
    const buttons = wrapper.findAll('button')
    expect(buttons[1].classes()).toContain('active')
    expect(buttons[0].classes()).not.toContain('active')
  })

  it('clicking "All" resets active to the "All" button', async () => {
    const wrapper = mount(FilterBar)
    await wrapper.findAll('button')[1].trigger('click')
    await wrapper.findAll('button')[0].trigger('click')
    const buttons = wrapper.findAll('button')
    expect(buttons[0].classes()).toContain('active')
    expect(buttons[1].classes()).not.toContain('active')
  })
})