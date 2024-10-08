<template>
  <div class="block md:hidden">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="(user, index) in users"
        :key="user.id"
        class="bg-white shadow-lg rounded-lg p-6 mb-4 transition-transform transform relative"
      >
        <div class="absolute right-5"></div>
        <div class="mb-2">
          <strong>Name:</strong> {{ user.first_name }} {{ user.last_name }}
        </div>
        <div class="mb-2"><strong>Email:</strong> {{ user.email }}</div>
        <div class="mb-2"><strong>Phone:</strong> {{ user.phone }}</div>
        <div class="absolute bottom-4 right-4 text-sm text-gray-500">
          {{ user.role }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import type { User } from "@/types/api/common";

const { users, viewUser, editUser, deleteUser } = defineProps<{
  users: User[];
  viewUser: (user: User) => void;
  editUser: (user: User) => void;
  deleteUser: (id: number) => void;
}>();
</script>
