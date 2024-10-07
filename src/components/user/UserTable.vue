<template>
  <div class="hidden md:block">
    <table class="min-w-full bg-white shadow-md rounded-lg">
      <thead class="bg-indigo-700 text-white">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
          >
            SN
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
          >
            Name
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
          >
            Email
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
          >
            Phone
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
          >
            Role
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="text-gray-700">
        <tr
          v-for="(user, index) in users"
          :key="user.id"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <td class="px-6 py-4 border-b border-gray-200">
            {{
              (paginationData.current_page - 1) * paginationData.page_size +
              index +
              1
            }}
          </td>
          <td class="px-6 py-4 border-b border-gray-200">
            {{ user.first_name }} {{ user.last_name }}
          </td>
          <td class="px-6 py-4 border-b border-gray-200">{{ user.email }}</td>
          <td class="px-6 py-4 border-b border-gray-200">{{ user.phone }}</td>
          <td class="px-6 py-4 border-b border-gray-200">{{ user.role }}</td>
          <td class="px-6 py-4 border-b border-gray-200">
            <UserOptions
              :user="user"
              @view="viewUser"
              @edit="editUser"
              @delete="deleteUser"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import UserOptions from "./UserOptions.vue";
import type { PaginationData, User } from "@/types/api/common";

const { users, paginationData, viewUser, editUser, deleteUser } = defineProps<{
  users: User[];
  paginationData: PaginationData;
  viewUser: (user: User) => void;
  editUser: (user: User) => void;
  deleteUser: (id: number) => void;
}>();
</script>
