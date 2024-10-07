<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Users</h1>

    <!-- Table View for large screens -->
    <div class="hidden md:block">
      <table class="w-full table-auto border-collapse bg-white shadow-lg">
        <thead class="bg-gray-200">
          <tr>
            <th class="px-4 py-2 border">SN</th>
            <th class="px-4 py-2 border">Name</th>
            <th class="px-4 py-2 border">Email</th>
            <th class="px-4 py-2 border">Phone</th>
            <th class="px-4 py-2 border">Role</th>
            <th class="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td class="px-4 py-2 border">{{ index + 1 }}</td>
            <td class="px-4 py-2 border">
              {{ user.first_name }} {{ user.last_name }}
            </td>
            <td class="px-4 py-2 border">{{ user.email }}</td>
            <td class="px-4 py-2 border">{{ user.phone }}</td>
            <td class="px-4 py-2 border">{{ user.role }}</td>
            <td class="px-4 py-2 border">
              <button
                @click="viewUser(user)"
                class="text-blue-500 hover:text-blue-700 mr-2"
              >
                View
              </button>
              <button
                @click="editUser(user)"
                class="text-green-500 hover:text-green-700 mr-2"
              >
                Edit
              </button>
              <button
                @click="deleteUser(user.id)"
                class="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Card View for small screens -->
    <div class="block md:hidden">
      <div
        v-for="(user, index) in users"
        :key="user.id"
        class="bg-white shadow-md rounded-lg p-4 mb-4"
      >
        <div class="mb-2"><strong>SN:</strong> {{ index + 1 }}</div>
        <div class="mb-2">
          <strong>Name:</strong> {{ user.first_name }} {{ user.last_name }}
        </div>
        <div class="mb-2"><strong>Email:</strong> {{ user.email }}</div>
        <div class="mb-2"><strong>Phone:</strong> {{ user.phone }}</div>
        <div class="mb-2"><strong>Role:</strong> {{ user.role }}</div>
        <div class="mt-4 flex space-x-2">
          <button
            @click="viewUser(user)"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            View
          </button>
          <button
            @click="editUser(user)"
            class="bg-green-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
          <button
            @click="deleteUser(user.id)"
            class="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User } from "@/types/api/auth";
import { ref } from "vue";

const users = ref<User[]>([
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "555-555-5555",
    role: "admin",
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    phone: "555-123-4567",
    role: "user",
  },
  {
    id: 3,
    first_name: "Sam",
    last_name: "Wilson",
    email: "sam.wilson@example.com",
    phone: "555-987-6543",
    role: "manager",
  },
]);

const viewUser = (user: User) => {
  console.log("View user:", user);
};

const editUser = (user: User) => {
  console.log("Edit user:", user);
};

const deleteUser = (id: number) => {
  console.log("Delete user with id:", id);
};
</script>

<style scoped>
/* Add some padding on small screens */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
</style>
