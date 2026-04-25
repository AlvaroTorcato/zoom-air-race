import { ref } from 'vue'
import data from '../data/events.json'

const events = ref(data)

export function useEvents() {
  return { events }
}
