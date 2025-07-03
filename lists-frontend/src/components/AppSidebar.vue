<script setup lang="ts">
import {
  Home,
  User,
  Users,
  Folder,
  Star,
  Settings,
  LogIn,
  LogOut
} from "lucide-vue-next";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { RouterLink } from "vue-router";

// Menu items for Tasks.
const taskItems = [
  {
    title: "Home",
    url: "/",
    icon: Home
  },
  {
    title: "My Lists",
    url: "/lists",
    icon: User
  },
  {
    title: "Shared with Me",
    url: "/shared",
    icon: Users
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings
  },
    {
    title: "Log In",
    url: "/login",
    icon: LogIn
  },
      {
    title: "Register",
    url: "/register",
    icon: Star
  }
];
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <!-- Workspace Label -->
      <SidebarGroup>
        <SidebarGroupLabel>TaskHub</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in taskItems" :key="item.title">
              <SidebarMenuButton asChild>
                <RouterLink
                  :to="item.url"
                  class="flex items-center gap-2"
                  active-class="text-primary"
                >
                  <component :is="item.icon" class="w-4 h-4" />
                  <span>{{ item.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <!-- Optional footer with logout -->
    <div
      class="mt-auto px-4 py-3 border-t border-zinc-800 flex items-center justify-between text-zinc-400"
    >
      <div class="flex items-center gap-2">
        <img
          src="https://ui-avatars.com/api/?name=User"
          class="w-6 h-6 rounded-full"
          alt="User Avatar"
        />
        <span class="text-sm">TestUser1</span>
      </div>
      <button class="hover:text-zinc-100">
        <LogOut class="w-4 h-4" />
      </button>
    </div>
  </Sidebar>
</template>
