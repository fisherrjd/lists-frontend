<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader>
        <CardTitle>Sign up for an account</CardTitle>
        <CardDescription>
          Enter your username, email, and password to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div class="flex flex-col gap-6">
            <div class="grid gap-3">
              <Label for="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="yourusername"
                required
              />
            </div>
            <div class="grid gap-3">
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div class="grid gap-3">
              <Label for="password">Password</Label>
              <Input id="password" type="password" required placeholder="Password"
/>
            </div>
            <div class="grid gap-3">
              <Label for="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" required placeholder="Confirm Password"/>
            </div>
            <div class="flex flex-col gap-3">
              <Button type="submit" class="w-full">
                Sign up
              </Button>
            </div>
          </div>
          <div class="mt-4 text-center text-sm">
            Already have an account?
            <a href="#" class="underline underline-offset-4">
              Login
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
