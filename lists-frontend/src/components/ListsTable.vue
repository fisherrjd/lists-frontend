<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ref } from 'vue'
import { Trash } from 'lucide-vue-next'

const props = defineProps<{ lists: Array<{ id: number, name: string, created: string, numberOfTasks: number }> }>()
const emit = defineEmits<{
  (event: 'select', list: { id: number, name: string, created: string, numberOfTasks: number }): void
  (event: 'list-added'): void
}>()

function selectList(list: { id: number, name: string, created: string, numberOfTasks: number }) {
  emit('select', list)
}

const showForm = ref(false)
const newTitle = ref('')
const newDescription = ref('')
const addLoading = ref(false)
const addError = ref('')

async function addList() {
  addLoading.value = true
  addError.value = ''
  try {
    const token = localStorage.getItem('access_token')
    const response = await fetch('http://eldo:9000/lists/', {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        title: newTitle.value,
        description: newDescription.value,
      })
    })
    if (!response.ok) throw new Error('Failed to add list')
    showForm.value = false
    newTitle.value = ''
    newDescription.value = ''
    emit('list-added')
  } catch (err: any) {
    addError.value = err.message || 'Error adding list'
  } finally {
    addLoading.value = false
  }
}

async function deleteList(listId: number) {
  if (!confirm('Are you sure you want to delete this list?')) return
  try {
    const token = localStorage.getItem('access_token')
    const response = await fetch(`http://eldo:9000/lists/${listId}`, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${token}`,
      },
    })
    if (!response.ok) throw new Error('Failed to delete list')
    emit('list-added') // reuse to refresh
  } catch (err: any) {
    alert(err.message || 'Error deleting list')
  }
}
</script>

<template>
  <div>
    <button
      class="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      @click="showForm = !showForm"
    >
      Add List
    </button>
    <div v-if="showForm" class="mb-4 p-4 border rounded bg-zinc-50 dark:bg-zinc-900">
      <div class="mb-2">
        <input v-model="newTitle" placeholder="Title" class="border px-2 py-1 rounded w-full mb-2" />
        <input v-model="newDescription" placeholder="Description" class="border px-2 py-1 rounded w-full" />
      </div>
      <button
        class="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 mr-2"
        :disabled="addLoading"
        @click="addList"
      >
        {{ addLoading ? 'Adding...' : 'Create' }}
      </button>
      <button class="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400" @click="showForm = false">Cancel</button>
      <div v-if="addError" class="text-red-500 text-sm mt-2">{{ addError }}</div>
    </div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="text-left w-[150px]">
            LIST_NAME
          </TableHead>
          <TableHead class="text-left w-[150px]">
            CREATED
          </TableHead>        
          <TableHead class="text-left w-[150px]">
            NUMBER_OF_TASKS
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="list in lists" :key="list.id" @click="selectList(list)" class="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <TableCell class="text-left font-medium">
            {{ list.name }}
          </TableCell>
          <TableCell class="text-left">
            {{ list.created }}
          </TableCell>
          <TableCell class="text-left flex items-center gap-2">
            {{ list.numberOfTasks }}
            <button
              @click.stop="deleteList(list.id)"
              class="ml-2 text-red-500 hover:text-red-700"
              title="Delete list"
            >
              <Trash class="inline w-4 h-4" />
            </button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>