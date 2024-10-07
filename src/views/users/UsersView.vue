<template>
  <div class="">
    <h1 class="text-2xl font-bold mb-4">Users</h1>

    <SearchInput v-model:searchQuery="searchQuery" />

    <UserTable
      :users="users"
      :paginationData="paginationData"
      :viewUser="viewUser"
      :editUser="editUser"
      :deleteUser="deleteUser"
    />

    <UserCard
      v-if="users.length"
      :users="users"
      :viewUser="viewUser"
      :editUser="editUser"
      :deleteUser="deleteUser"
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
import UserTable from "@/components/user/UserTable.vue";
import UserCard from "@/components/user/UserCard.vue";
import type { PaginationData, User } from "@/types/api/common";
import SearchInput from "@/components/search/SearchInput.vue";

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
