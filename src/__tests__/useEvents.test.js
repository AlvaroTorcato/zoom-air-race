import { isRef } from 'vue'
import { useEvents } from '@/composables/useEvents'

describe('useEvents', () => {
  it('returns an object with an events key', () => {
    const result = useEvents()
    expect(result).toHaveProperty('events')
  })

  it('events is a Vue Ref', () => {
    const { events } = useEvents()
    expect(isRef(events)).toBe(true)
  })

  it('events.value is a non-empty array', () => {
    const { events } = useEvents()
    expect(Array.isArray(events.value)).toBe(true)
    expect(events.value.length).toBeGreaterThan(0)
  })

  it('each item has the expected shape', () => {
    const { events } = useEvents()
    events.value.forEach(event => {
      expect(typeof event.id).toBe('string')
      expect(typeof event.title).toBe('string')
      expect(typeof event.category).toBe('string')
      expect(typeof event.coordinates.lat).toBe('number')
      expect(typeof event.coordinates.lng).toBe('number')
    })
  })
})
