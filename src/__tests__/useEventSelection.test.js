import { ref } from 'vue'

const mockEvents = ref([
  { id: 'id-1', category: 'A' },
  { id: 'id-2', category: 'A' },
  { id: 'id-3', category: 'B' },
])

let useEventSelection

beforeEach(async () => {
  vi.resetModules()
  const mod = await import('@/composables/useEventSelection')
  useEventSelection = mod.useEventSelection
})

describe('useEventSelection', () => {
  it('returns all expected keys', () => {
    const result = useEventSelection(mockEvents)
    expect(result).toHaveProperty('filteredEvents')
    expect(result).toHaveProperty('activeCategory')
    expect(result).toHaveProperty('hoveredId')
    expect(result).toHaveProperty('selectedId')
    expect(result).toHaveProperty('setHovered')
    expect(result).toHaveProperty('setSelected')
    expect(result).toHaveProperty('setCategory')
  })

  it('filteredEvents equals all events when activeCategory is null', () => {
    const { filteredEvents } = useEventSelection(mockEvents)
    expect(filteredEvents.value).toEqual(mockEvents.value)
  })

  it('setCategory("A") returns only category-A events', () => {
    const { filteredEvents, setCategory } = useEventSelection(mockEvents)
    setCategory('A')
    expect(filteredEvents.value.every(e => e.category === 'A')).toBe(true)
    expect(filteredEvents.value.length).toBe(2)
  })

  it('setCategory("B") returns only category-B events', () => {
    const { filteredEvents, setCategory } = useEventSelection(mockEvents)
    setCategory('B')
    expect(filteredEvents.value.every(e => e.category === 'B')).toBe(true)
    expect(filteredEvents.value.length).toBe(1)
  })

  it('setCategory(null) returns to full list', () => {
    const { filteredEvents, setCategory } = useEventSelection(mockEvents)
    setCategory('A')
    setCategory(null)
    expect(filteredEvents.value).toEqual(mockEvents.value)
  })

  it('setHovered("id-1") sets hoveredId', () => {
    const { hoveredId, setHovered } = useEventSelection(mockEvents)
    setHovered('id-1')
    expect(hoveredId.value).toBe('id-1')
  })

  it('setHovered(null) clears hoveredId', () => {
    const { hoveredId, setHovered } = useEventSelection(mockEvents)
    setHovered('id-1')
    setHovered(null)
    expect(hoveredId.value).toBeNull()
  })

  it('setSelected("id-1") sets selectedId', () => {
    const { selectedId, setSelected } = useEventSelection(mockEvents)
    setSelected('id-1')
    expect(selectedId.value).toBe('id-1')
  })

  it('setSelected("id-1") again toggles selectedId to null', () => {
    const { selectedId, setSelected } = useEventSelection(mockEvents)
    setSelected('id-1')
    setSelected('id-1')
    expect(selectedId.value).toBeNull()
  })

  it('two calls return the same ref instances (singleton)', () => {
    const a = useEventSelection(mockEvents)
    const b = useEventSelection()
    expect(a.hoveredId).toBe(b.hoveredId)
    expect(a.selectedId).toBe(b.selectedId)
    expect(a.activeCategory).toBe(b.activeCategory)
    expect(a.filteredEvents).toBe(b.filteredEvents)
  })
})