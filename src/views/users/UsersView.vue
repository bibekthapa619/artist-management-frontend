<template>
  <div class="">
    <h1 class="text-2xl font-bold mb-4">Users</h1>

    <div class="flex justify-between items-center mb-4 space-x-4">
      <router-link
        to="/users/create"
        class="bg-indigo-700 text-white px-4 py-2 h-10 rounded-lg shadow hover:bg-indigo-800 flex items-center justify-center"
      >
        Create
      </router-link>
      <SearchInput v-model:searchQuery="searchQuery" />
    </div>

    <UserTable
      :users="users"
      :paginationData="paginationData"
      :viewUser="viewUser"
      :editUser="editUser"
      :deleteUser="deleteUser"
      :options="options"
    />

    <UserCard
      v-if="users.length"
      :users="users"
      :viewUser="viewUser"
      :editUser="editUser"
      :deleteUser="deleteUser"
      :options="options"
    />

    <Pagination
      :pagination="paginationData"
      :updateCurrentPage="updateCurrentPage"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { getUsers } from "@/api/users";
import Pagination from "@/components/pagination/Pagination.vue";
import type { PaginationData, User } from "@/types/api/common";
import SearchInput from "@/components/search/SearchInput.vue";
import UserCard from "@/sections/users/UserCard.vue";
import UserTable from "@/sections/users/UserTable.vue";
import type { TableOption } from "@/components/table/table";

const users = ref<User[]>([]);
const paginationData = ref<PaginationData>({
  total: 0,
  last_page: 0,
  current_page: 0,
  from: 0,
  to: 0,
  page_size: 0,
});
const searchQuery = ref<string>("");

const viewUser = (user: User) => {
  console.log("View user:", user);
};

const editUser = (user: User) => {
  console.log("Edit user:", user);
};

const deleteUser = (id: number) => {
  console.log("Delete user with id:", id);
};

const options: TableOption[] = [
  {
    title: "View",
    action: viewUser,
  },
  {
    title: "Edit",
    action: editUser,
  },
  {
    title: "Delete",
    action: deleteUser,
    isDanger: true,
  },
];

const fetchUsers = async (page = 1, perPage = 10, query = "") => {
  let res = await getUsers(page, perPage, query);
  users.value = res.data.users;
  paginationData.value = res.data.meta;
};

watch(searchQuery, (newQuery) => {
  fetchUsers(1, paginationData.value.page_size, newQuery);
});

onMounted(async () => {
  await fetchUsers();
});

const updateCurrentPage = async (page: number) => {
  await fetchUsers(page);
};
</script>
