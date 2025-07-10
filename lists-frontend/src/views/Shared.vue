<script setup>
import { ref } from 'vue'
import ListsTable from '@/components/ListsTable.vue'
import TaskTable from '@/components/TaskTable.vue'

// Example data
const lists = ref([
  {
    id: 1,
    name: 'Kroger Groceries',
    created: 'July 3rd, 2025',
    numberOfTasks: 2,
    tasks: [
      { id: 1, name: 'Buy milk', status: 'Pending', method: 'Manual', amount: '-' },
      { id: 2, name: 'Buy eggs', status: 'Done', method: 'Manual', amount: '-' },
    ],
  },
  {
    id: 2,
    name: 'Work Tasks',
    created: 'July 1st, 2025',
    numberOfTasks: 1,
    tasks: [
      { id: 3, name: 'Send report', status: 'Pending', method: 'Email', amount: '-' },
    ],
  },
])

const selectedList = ref(lists.value[0])

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
