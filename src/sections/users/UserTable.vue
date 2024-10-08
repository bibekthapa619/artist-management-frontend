<template>
  <Table
    :headers="headers"
    :rows="formattedUsers"
    :paginationData="paginationData"
    :options="options"
  ></Table>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";
import type { FormattedUser, PaginationData, User } from "@/types/api/common";
import type { TableHeaderType, TableOption } from "@/components/table/table";
import Table from "@/components/table/Table.vue";

const { users, paginationData, viewUser, editUser, deleteUser, options } =
  defineProps<{
    users: User[];
    paginationData: PaginationData;
    viewUser: (user: FormattedUser) => void;
    editUser: (user: FormattedUser) => void;
    deleteUser: (id: FormattedUser) => void;
    options?: TableOption[];
  }>();

const headers: TableHeaderType[] = [
  {
    key: "name",
    title: "Name",
  },
  {
    key: "email",
    title: "Email",
  },
  {
    key: "phone",
    title: "Phone",
  },
  {
    key: "role",
    title: "Role",
  },
];

const formattedUsers = computed(() =>
  users.map((user) => ({
    id: user.id,
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    phone: user.phone,
    role: user.role,
  }))
);
</script>
