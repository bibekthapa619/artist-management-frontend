<template>
  <Table
    :headers="headers"
    :rows="musics"
    :paginationData="paginationData"
    :options="options"
  ></Table>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import type { Music, PaginationData } from "@/types/api/common";
import type { TableHeaderType, TableOption } from "@/components/table/table";
import Table from "@/components/table/Table.vue";

const { musics, paginationData, options } = defineProps<{
  musics: Music[];
  paginationData: PaginationData;
  options?: TableOption[];
}>();

const headers: TableHeaderType[] = [
  {
    key: "title",
    title: "Title",
  },
  {
    key: "album_name",
    title: "Album Name",
  },
  {
    key: "genre",
    title: "Genre",
  },
];
</script>
