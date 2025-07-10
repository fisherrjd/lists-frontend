<script setup lang="ts">
import { ref } from 'vue'
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
import { useRouter } from 'vue-router'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const router = useRouter()

async function handleLogin(e: Event) {
  e.preventDefault()
  loading.value = true
  error.value = ''
  const params = new URLSearchParams()
  params.append('username', username.value)
  params.append('password', password.value)
  try {
    const response = await fetch('http://eldo:9000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    })
    if (!response.ok) {
      throw new Error('Invalid username or password')
    }
    const data = await response.json()
    // Save all response values
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('token_type', data.token_type)
    // Optionally, save the whole object
    localStorage.setItem('auth_response', JSON.stringify(data))
    // Redirect to home
    router.push({ path: '/' })
  } catch (err: any) {
    error.value = err.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your username and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="handleLogin">
          <div class="flex flex-col gap-6">
            <div class="grid gap-3">
              <Label for="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                required
                v-model="username"
              />
            </div>
            <div class="grid gap-3">
              <div class="flex items-center">
                <Label for="password">Password</Label>
                <a
                  href="#"
                  class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required placeholder="Password" v-model="password" />
            </div>
            <div class="flex flex-col gap-3">
              <Button type="submit" class="w-full" :disabled="loading">
                <span v-if="loading">Logging in...</span>
                <span v-else>Login</span>
              </Button>
              <!-- <Button variant="outline" class="w-full">
                Login with Google
              </Button> -->
            </div>
            <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
          </div>
          <div class="mt-4 text-center text-sm">
            Don't have an account?
            <a href="#" class="underline underline-offset-4">
              Sign up
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
