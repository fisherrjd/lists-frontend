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

const props = defineProps<{ lists: Array<{ id: number, name: string, created: string, numberOfTasks: number }> }>()
const emit = defineEmits<{ (event: 'select', list: { id: number, name: string, created: string, numberOfTasks: number }): void }>()

function selectList(list: { id: number, name: string, created: string, numberOfTasks: number }) {
  emit('select', list)
}
</script>

<template>
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
        <TableCell class="text-left">
          {{ list.numberOfTasks }}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>