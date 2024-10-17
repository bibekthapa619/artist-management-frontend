<template>
  <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
  <AdminDashboard v-if="user?.role == 'super_admin'" />
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import AdminDashboard from "./AdminDashboard.vue";
import { useUserStore } from "@/store/userStore";
const userStore = useUserStore();

const { user, isLoggedIn } = storeToRefs(userStore);
</script>
