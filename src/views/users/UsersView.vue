<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Users</h1>

    <!-- Table View for large screens -->
    <div class="hidden md:block">
      <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
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
              <div class="relative inline-block">
                <button
                  @click="toggleOptions(user.id)"
                  class="text-gray-600 hover:text-gray-900 focus:outline-none"
                  :id="`user-options-${user.id}`"
                >
                  <i class="fas fa-cog"></i>
                </button>
                <div
                  v-if="selectedUserId === user.id"
                  class="absolute right-0 w-48 mt-1 bg-white shadow-lg rounded-md z-10 border border-gray-200"
                >
                  <div
                    @click="viewUser(user)"
                    class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    View
                  </div>
                  <div
                    @click="editUser(user)"
                    class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Edit
                  </div>
                  <div
                    @click="deleteUser(user.id)"
                    class="px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer"
                  >
                    Delete
                  </div>
                </div>
              </div>
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

    <Pagination
      :pagination="paginationData"
      :updateCurrentPage="updateCurrentPage"
    />
  </div>
</template>

<script lang="ts" setup>
import { getUsers } from "@/api/users";
import Pagination from "@/components/pagination/Pagination.vue";
import type { PaginationData, User } from "@/types/api/common";
import { onBeforeUnmount, onMounted, ref } from "vue";

const selectedUserId = ref<number | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);
const users = ref<User[]>([]);
const paginationData = ref<PaginationData>({
  total: 0,
  last_page: 0,
  current_page: 0,
  from: 0,
  to: 0,
  page_size: 0,
});

//for dropdown
const toggleOptions = (userId: number) => {
  selectedUserId.value = selectedUserId.value === userId ? null : userId;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (selectedUserId.value) {
    dropdownRef.value = document.getElementById(
      `user-options-${selectedUserId.value}`
    );
    if (dropdownRef.value && !dropdownRef.value.contains(target)) {
      selectedUserId.value = null;
    }
  }
};

const fetchUsers = async (page = 1, perPage = 2) => {
  let res = await getUsers(page, perPage);
  users.value = res.data.users;
  paginationData.value = res.data.meta;
};

onMounted(async () => {
  document.addEventListener("click", handleClickOutside);
  await fetchUsers();
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const updateCurrentPage = async (page: number) => {
  await fetchUsers(page);
};

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
