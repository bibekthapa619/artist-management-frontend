<template>
  <Table
    :headers="headers"
    :rows="artists"
    :paginationData="paginationData"
    :options="options"
  ></Table>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import type { Artist, PaginationData } from "@/types/api/common";
import type { TableHeaderType, TableOption } from "@/components/table/table";
import Table from "@/components/table/Table.vue";

const { artists, paginationData, options } = defineProps<{
  artists: Artist[];
  paginationData: PaginationData;
  options?: TableOption[];
}>();

const headers: TableHeaderType[] = [
  {
    key: "name",
    title: "Artist Name",
  },
  {
    key: "no_of_albums_released",
    title: "Num of Albums",
  },
  {
    key: "first_release_year",
    title: "First Release",
  },
  {
    key: "music_count",
    title: "Total Music",
  },
];
</script>
