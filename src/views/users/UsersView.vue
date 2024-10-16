<template>
  <div class="">
    <div class="flex justify-between items-center mb-4 space-x-4">
      <h1 class="text-2xl font-bold mb-4">Users</h1>
      <router-link
        to="/users/create"
        class="bg-primary text-white px-4 py-2 h-10 rounded shadow hover:bg-primary-hover flex items-center justify-center"
      >
        Create
      </router-link>
    </div>

    <div class="flex justify-between items-center mb-4 space-x-4">
      <SortOptions
        :options="sortOptions"
        :modelValue="selectedSort"
        @update:modelValue="selectedSort = $event"
      />
      <SearchInput
        v-model:searchQuery="searchQuery"
        class="w-48 sm:w-64"
        :placeholder="`Search users...`"
      />
    </div>

    <div class="hidden md:block">
      <UserTable
        :users="users"
        :paginationData="paginationData"
        :options="options"
      />
    </div>
    <div class="block md:hidden">
      <UserCard v-if="users.length" :users="users" :options="options" />
    </div>
    <Pagination
      :pagination="paginationData"
      :updateCurrentPage="updateCurrentPage"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { deleteUserById, getUsers } from "@/api/users";
import Pagination from "@/components/pagination/Pagination.vue";
import type { FormattedUser, PaginationData, User } from "@/types/api/common";
import SearchInput from "@/components/search/SearchInput.vue";
import UserCard from "@/sections/users/UserCard.vue";
import UserTable from "@/sections/users/UserTable.vue";
import type { TableOption } from "@/components/table/table";
import { useRouter } from "vue-router";
import { notifyError, notifySuccess } from "@/main";
import SortOptions from "@/components/table/SortOptions.vue";

const users = ref<User[]>([]);
const pageSize = ref<number>(10);
const paginationData = ref<PaginationData>({
  total: 0,
  last_page: 0,
  current_page: 0,
  from: 0,
  to: 0,
  page_size: 0,
});
const searchQuery = ref<string>("");
const refresh = ref<boolean>(false);
const router = useRouter();

const selectedSort = ref("name-asc");
const sortOptions = [
  { value: "name-asc", label: "Name(Asc)" },
  { value: "name-desc", label: "Name(Desc)" },
  { value: "last-modified", label: "Last Modified" },
  { value: "date-created", label: "Date Created" },
];

const viewUser = (user: FormattedUser) => {
  router.push({
    name: "users.show",
    params: { id: user.id },
  });
};

const editUser = (user: FormattedUser) => {
  router.push({
    name: "users.edit",
    params: { id: user.id },
  });
};

const deleteUser = async (user: FormattedUser) => {
  const isConfirmed = confirm(`Are you sure you want to delete ${user.name}?`);
  if (isConfirmed) {
    try {
      let res = await deleteUserById(user.id);
      refresh.value = !refresh.value;
      notifySuccess(res.message);
    } catch (err) {
      notifyError("Failed to delete.");
    }
  }
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

const fetchUsers = async (
  page = 1,
  perPage = pageSize.value,
  query = "",
  sortBy = sortOptions[0].value
) => {
  let res = await getUsers(page, perPage, query, sortBy);
  users.value = res.data.users;
  paginationData.value = res.data.meta;
};

watch(searchQuery, (newQuery) => {
  fetchUsers(1, pageSize.value, newQuery, selectedSort.value);
});

watch(refresh, () => {
  fetchUsers(
    paginationData.value.current_page,
    pageSize.value,
    searchQuery.value,
    selectedSort.value
  );
});

watch(selectedSort, (newSort) => {
  fetchUsers(1, pageSize.value, searchQuery.value, newSort);
});

const updateCurrentPage = async (page: number) => {
  await fetchUsers(page, pageSize.value, searchQuery.value, selectedSort.value);
};

onMounted(async () => {
  await fetchUsers();
});
</script>
