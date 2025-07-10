<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
      <TableRow>
        <TableCell class="text-left font-medium">
          Kroger Groceries
        </TableCell>
        <TableCell class="text-left">
          July 3rd, 2025
        </TableCell>
        <TableCell class="text-left">
          10
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>