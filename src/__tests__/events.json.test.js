import events from '@/data/events.json'

describe('events.json', () => {
  it('contains at least 8 events', () => {
    expect(events.length).toBeGreaterThanOrEqual(8)
  })

  it('every event has required string fields', () => {
    const stringFields = ['id', 'title', 'description', 'address', 'country', 'category']
    events.forEach(event => {
      stringFields.forEach(field => {
        expect(typeof event[field]).toBe('string')
      })
    })
  })

  it('every event has category A or B', () => {
    events.forEach(event => {
      expect(['A', 'B']).toContain(event.category)
    })
  })

  it('every event has numeric coordinates', () => {
    events.forEach(event => {
      expect(typeof event.coordinates.lat).toBe('number')
      expect(typeof event.coordinates.lng).toBe('number')
    })
  })

  it('all id values are unique', () => {
    const ids = events.map(e => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
