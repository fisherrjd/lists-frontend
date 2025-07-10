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
    <TableCaption>LIST_NAME</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[150px]">
          List NAME
        </TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead class="text-right">
          Amount
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell class="font-medium">
          INV001
        </TableCell>
        <TableCell>Paid</TableCell>
        <TableCell>Credit Card</TableCell>
        <TableCell class="text-right">
          $250.00
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>