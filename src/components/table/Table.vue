<template>
  <table class="min-w-full bg-white shadow-md rounded-lg">
    <thead class="bg-white text-gray">
      <tr>
        <th
          class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
        >
          SN
        </th>
        <th
          v-for="(header, index) in headers"
          :key="index"
          class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
        >
          {{ header.title }}
        </th>
        <th
          class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
          v-if="options && options.length > 0"
        >
          Actions
        </th>
      </tr>
    </thead>
    <tbody class="text-gray-700">
      <tr
        v-for="(row, index) in rows"
        :key="row.id"
        class="hover:bg-gray-100 transition-colors duration-200"
      >
        <td class="px-6 py-4 border-b border-gray-200">
          {{
            paginationData
              ? (paginationData.current_page - 1) * paginationData.page_size +
                index +
                1
              : index + 1
          }}
        </td>
        <td
          v-for="(header, index) in headers"
          :key="`${row.id - index}`"
          class="px-6 py-4 border-b border-gray-200"
        >
          {{ row[header.key] }}
        </td>
        <td
          class="px-6 py-4 border-b border-gray-200"
          v-if="options && options.length > 0"
          :id="`table-options-${row.id}`"
        >
          <div class="relative inline-block">
            <button
              @click="() => toggleOptions(row.id)"
              class="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <i class="fas fa-cog"></i>
            </button>
            <div
              v-if="selectedId === row.id"
              class="absolute right-0 w-48 mt-1 bg-white shadow-lg rounded-md z-10 border border-gray-200"
            >
              <TableOptions :options="options" :argument="row"></TableOptions>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { defineProps, onBeforeUnmount, onMounted, ref, type Ref } from "vue";
import type { TableProps } from "./table";
import TableOptions from "./TableOptions.vue";

const { headers, rows, options, paginationData } =
  defineProps<TableProps<Record<string, any>>>();

const selectedId: Ref = ref(null);
const dropdownRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (selectedId.value) {
    const id = `table-options-${selectedId.value}`;
    dropdownRef.value = document.getElementById(id);

    if (dropdownRef.value && !dropdownRef.value.contains(target)) {
      selectedId.value = null;
    }
  }
};

const toggleOptions = (id: number) => {
  if (!selectedId.value || selectedId.value !== id) {
    selectedId.value = id;
    return;
  }

  selectedId.value = null;
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
