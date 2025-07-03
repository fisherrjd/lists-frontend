import { createRouter, createWebHistory } from "vue-router";

import Lists from "@/views/Lists.vue";
import Home from "@/views/Home.vue";
import Shared from "@/views/Shared.vue";
import Settings from "@/views/Settings.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/lists", component: Lists },
    { path: "/shared", component: Shared },
    { path: "/settings", component: Settings },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
