import { ref, onMounted } from 'vue'

const events = ref([])
const loading = ref(false)
const error = ref(null)

export function useEvents() {
  onMounted(async () => {
    if (events.value.length > 0) return
    loading.value = true
    try {
      const res = await fetch('/api/events')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      events.value = await res.json()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  })
  return { events, loading, error }
}
