<script setup lang="ts">
import { defineProps } from 'vue'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const props = defineProps<{ tasks: Array<{ id: number, name: string, status: string, method: string, amount: string }> }>()
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[150px]">
          Task Name
        </TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead class="text-right">
          Amount
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="task in tasks" :key="task.id">
        <TableCell class="font-medium">
          {{ task.name }}
        </TableCell>
        <TableCell>{{ task.status }}</TableCell>
        <TableCell>{{ task.method }}</TableCell>
        <TableCell class="text-right">
          {{ task.amount }}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>