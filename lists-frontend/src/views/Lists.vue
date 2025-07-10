<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import ListsTable from '@/components/ListsTable.vue'
import TaskTable from '@/components/TaskTable.vue'

const apiLists = ref([])
const loading = ref(false)
const error = ref('')

async function fetchLists() {
  loading.value = true
  error.value = ''
  try {
    const token = localStorage.getItem('access_token')
    const response = await fetch('http://eldo:9000/lists/', {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    if (!response.ok) throw new Error('Failed to fetch lists')
    apiLists.value = await response.json()
  } catch (err) {
    error.value = err.message || 'Error fetching lists'
  } finally {
    loading.value = false
  }
}

onMounted(fetchLists)

// Optionally, refresh on window focus for real-time updates
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') fetchLists()
})

const lists = computed(() => apiLists.value.map(list => ({
  id: list.id,
  name: list.title,
  created: new Date(list.created_at).toLocaleDateString(),
  numberOfTasks: list.tasks.length,
  tasks: list.tasks.map(task => ({
    id: task.id,
    name: task.title,
    status: task.completed ? 'Done' : 'Pending',
    method: '',
    amount: task.quantity
  }))
})))

const selectedList = ref(null)

watch(lists, (newLists) => {
  if (!selectedList.value && newLists.length > 0) {
    selectedList.value = newLists[0]
  }
}, { immediate: true })

function handleSelect(list) {
  selectedList.value = list
}

function handleListAdded() {
  fetchLists()
}
</script>

<template>
  <div class="p-6 text-zinc-900 dark:text-zinc-100">
    <h1 class="text-xl font-semibold mb-4">Lists</h1>
    <ListsTable :lists="lists" @select="handleSelect" @list-added="handleListAdded" />
    <div v-if="loading" class="mt-2 text-sm text-zinc-500">Loading...</div>
    <div v-if="error" class="mt-2 text-sm text-red-500">{{ error }}</div>
    <div v-if="selectedList" class="mt-8">
      <h2 class="text-lg font-semibold mb-2">Tasks for {{ selectedList.name }}</h2>
      <TaskTable :tasks="selectedList.tasks" />
    </div>
  </div>
</template>
