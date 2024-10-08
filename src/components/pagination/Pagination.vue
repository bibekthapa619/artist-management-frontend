<!-- Pagination.vue -->
<template>
  <div
    v-if="pagination.total > 0"
    class="px-6 py-4 bg-gray-50 flex justify-between items-center"
  >
    <div v-if="pagination.last_page > 1" class="flex space-x-2">
      <button
        @click="prevPage"
        :disabled="pagination.current_page === 1"
        class="px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 flex items-center"
        v-if="pagination.current_page > 1"
      >
        <
      </button>

      <button
        @click="changePage(1)"
        :class="
          pagination.current_page === 1 ? 'bg-indigo-700' : 'bg-indigo-500'
        "
        class="px-3 py-2 text-white rounded-lg hover:bg-indigo-600"
      >
        1
      </button>

      <span v-if="pagination.current_page > 3" class="px-3 py-2 text-gray-500"
        >...</span
      >

      <button
        v-for="page in visiblePages"
        :key="page"
        @click="changePage(page)"
        :class="{
          'bg-indigo-700': pagination.current_page === page,
          'bg-indigo-500': pagination.current_page !== page,
          'text-white rounded-lg hover:bg-indigo-600': true,
        }"
        class="px-3 py-2"
      >
        {{ page }}
      </button>

      <span
        v-if="pagination.current_page < pagination.last_page - 2"
        class="px-3 py-2 text-gray-500"
        >...</span
      >

      <button
        @click="changePage(pagination.last_page)"
        :class="
          pagination.current_page === pagination.last_page
            ? 'bg-indigo-700'
            : 'bg-indigo-500'
        "
        class="px-3 py-2 text-white rounded-lg hover:bg-indigo-600"
      >
        {{ pagination.last_page }}
      </button>

      <button
        @click="nextPage"
        :disabled="pagination.current_page === pagination.last_page"
        class="px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 flex items-center"
        v-if="pagination.current_page < pagination.last_page"
      >
        >
      </button>
    </div>
  </div>
  <div v-else class="px-6 py-4">No records found.</div>
</template>

<script setup lang="ts">
import type { PaginationData } from "@/types/api/common";
import { defineProps, computed } from "vue";

const props = defineProps<{
  pagination: PaginationData;
  updateCurrentPage: (page: number) => void;
}>();

// Computed properties for pagination logic
const visiblePages = computed(() => {
  const pages: number[] = [];
  const totalPages = props.pagination.last_page;
  const currentPage = props.pagination.current_page;

  const startPage = Math.max(2, currentPage - 1); // Adjust based on your needs
  const endPage = Math.min(totalPages - 1, currentPage + 1); // Adjust based on your needs

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

// Emit events for page changes
const changePage = (page: number) => {
  if (page !== props.pagination.current_page) {
    props.updateCurrentPage(page);
  }
};

const prevPage = () => {
  if (props.pagination.current_page > 1) {
    props.updateCurrentPage(props.pagination.current_page - 1);
  }
};

const nextPage = () => {
  if (props.pagination.current_page < props.pagination.last_page) {
    props.updateCurrentPage(props.pagination.current_page + 1);
  }
};
</script>

<style scoped>
/* Add any additional styling you want for the pagination component */
</style>
