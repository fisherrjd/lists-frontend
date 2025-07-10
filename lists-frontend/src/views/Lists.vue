<script setup>
import { ref, computed, watch } from 'vue'
import ListsTable from '@/components/ListsTable.vue'
import TaskTable from '@/components/TaskTable.vue'

// Simulated API response
const apiLists = ref([
  {
    id: 'c61084ca-4318-41b1-913c-87d277b234c2',
    title: 'Costco',
    description: 'Large Weekly shopping',
    created_at: '2025-07-10T14:26:12.964479',
    updated_at: '2025-07-10T14:26:12.964519',
    owner_id: '816505c6-f4a6-403e-9ee4-5b71714a6158',
    tasks: [
      {
        title: 'Apples',
        completed: false,
        quantity: 3,
        id: '56723b1d-6624-4ab5-84c3-41d64ab983a9',
        task_list_id: 'c61084ca-4318-41b1-913c-87d277b234c2',
        created_at: '2025-07-10T14:26:23.409037',
        updated_at: '2025-07-10T14:26:23.409076'
      },
      {
        title: 'Bananas',
        completed: false,
        quantity: 3,
        id: 'b87c565a-da74-4d8a-9989-1c3524dfcf97',
        task_list_id: 'c61084ca-4318-41b1-913c-87d277b234c2',
        created_at: '2025-07-10T14:26:28.754944',
        updated_at: '2025-07-10T14:26:28.755022'
      }
    ],
    shares: []
  },
  {
    id: '22f1d159-1753-41c0-8ca5-5c02984ff697',
    title: 'Camping',
    description: 'Camping Supplies',
    created_at: '2025-07-10T14:32:52.244162',
    updated_at: '2025-07-10T14:32:52.244180',
    owner_id: '816505c6-f4a6-403e-9ee4-5b71714a6158',
    tasks: [
      {
        title: 'Chairs',
        completed: false,
        quantity: 3,
        id: 'c26d1622-7940-4464-ac19-3eb7e65d2335',
        task_list_id: '22f1d159-1753-41c0-8ca5-5c02984ff697',
        created_at: '2025-07-10T14:32:57.714720',
        updated_at: '2025-07-10T14:32:57.714759'
      },
      {
        title: 'Tent',
        completed: false,
        quantity: 1,
        id: '8eef36b0-b1fb-48b8-acff-9258becf612e',
        task_list_id: '22f1d159-1753-41c0-8ca5-5c02984ff697',
        created_at: '2025-07-10T14:33:04.236623',
        updated_at: '2025-07-10T14:33:04.236662'
      }
    ],
    shares: []
  }
])

// Map API data to ListsTable format
const lists = computed(() => apiLists.value.map(list => ({
  id: list.id,
  name: list.title,
  created: new Date(list.created_at).toLocaleDateString(),
  numberOfTasks: list.tasks.length,
  tasks: list.tasks.map(task => ({
    id: task.id,
    name: task.title,
    status: task.completed ? 'Done' : 'Pending',
    method: '', // Not available in API
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
</script>

<template>
  <div class="p-6 text-zinc-900 dark:text-zinc-100">
    <h1 class="text-xl font-semibold mb-4">Lists</h1>
    <ListsTable :lists="lists" @select="handleSelect" />
    <div v-if="selectedList" class="mt-8">
      <h2 class="text-lg font-semibold mb-2">Tasks for {{ selectedList.name }}</h2>
      <TaskTable :tasks="selectedList.tasks" />
    </div>
  </div>
</template>
