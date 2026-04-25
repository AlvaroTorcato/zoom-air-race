import { vi } from 'vitest'

const markerInstance = {
  addTo: vi.fn().mockReturnThis(),
  on: vi.fn().mockReturnThis(),
  bindPopup: vi.fn().mockReturnThis(),
  setIcon: vi.fn().mockReturnThis(),
  remove: vi.fn()
}

const mapInstance = {
  setView: vi.fn().mockReturnThis(),
  addLayer: vi.fn().mockReturnThis(),
  remove: vi.fn()
}

export default {
  marker: vi.fn(() => markerInstance),
  divIcon: vi.fn(() => ({})),
  map: vi.fn(() => mapInstance),
  tileLayer: vi.fn(() => ({ addTo: vi.fn().mockReturnThis() }))
}