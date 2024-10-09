<template>
  <div
    v-if="pagination.last_page > 1"
    class="py-3 sm:py-4 flex justify-between items-center"
  >
    <div class="flex space-x-1 sm:space-x-2">
      <button
        @click="prevPage"
        :disabled="pagination.current_page === 1"
        class="px-2 sm:px-3 py-1 sm:py-2 text-primary bg-white rounded border shadow-md hover:bg-primary hover:text-white flex items-center text-sm sm:text-base"
        v-if="pagination.current_page > 1"
      >
        &lt;
      </button>

      <button
        @click="changePage(1)"
        :class="
          pagination.current_page === 1
            ? 'bg-primary text-white '
            : 'bg-white text-primary border'
        "
        class="px-2 sm:px-3 py-1 sm:py-2 rounded shadow-md hover:bg-primary hover:text-white text-sm sm:text-base"
      >
        1
      </button>

      <span
        v-if="pagination.current_page > 3"
        class="px-2 sm:px-3 py-1 sm:py-2 text-gray-500 text-sm sm:text-base"
      >
        ...
      </span>

      <button
        v-for="page in visiblePages"
        :key="page"
        @click="changePage(page)"
        :class="{
          'bg-primary text-white': pagination.current_page === page,
          'bg-white text-primary border': pagination.current_page !== page,
          'rounded hover:bg-primary hover:text-white shadow-md': true,
        }"
        class="px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base"
      >
        {{ page }}
      </button>

      <span
        v-if="pagination.current_page < pagination.last_page - 2"
        class="px-2 sm:px-3 py-1 sm:py-2 text-gray-500 text-sm sm:text-base"
      >
        ...
      </span>

      <button
        @click="changePage(pagination.last_page)"
        :class="
          pagination.current_page === pagination.last_page
            ? 'bg-primary text-white '
            : 'bg-white text-primary border '
        "
        class="px-2 sm:px-3 py-1 sm:py-2 shadow-md rounded hover:bg-primary hover:text-white text-sm sm:text-base"
      >
        {{ pagination.last_page }}
      </button>

      <button
        @click="nextPage"
        :disabled="pagination.current_page === pagination.last_page"
        class="px-2 sm:px-3 py-1 sm:py-2 bg-white text-primary rounded border shadow-md hover:bg-primary hover:text-white flex items-center text-sm sm:text-base"
        v-if="pagination.current_page < pagination.last_page"
      >
        &gt;
      </button>
    </div>
  </div>
  <div v-if="pagination.total == 0" class="px-4 sm:px-6 py-3 sm:py-4">
    No records found.
  </div>
</template>

<script setup lang="ts">
import type { PaginationData } from "@/types/api/common";
import { defineProps, computed } from "vue";

const props = defineProps<{
  pagination: PaginationData;
  updateCurrentPage: (page: number) => void;
}>();

const visiblePages = computed(() => {
  const pages: number[] = [];
  const totalPages = props.pagination.last_page;
  const currentPage = props.pagination.current_page;

  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

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
