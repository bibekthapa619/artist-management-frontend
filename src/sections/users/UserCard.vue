<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    <div
      v-for="(user, index) in users"
      :key="user.id"
      class="bg-white shadow-lg rounded p-6 transition-transform transform hover:scale-105 relative"
    >
      <!-- Card Options -->
      <div
        class="flex justify-between items-center mb-4"
        v-if="options && options.length > 0"
      >
        <div class="absolute top-4 right-4" :id="`card-options-${user.id}`">
          <button
            @click="() => toggleOptions(user.id)"
            class="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <i class="fas fa-cog"></i>
          </button>
          <div
            v-if="selectedId === user.id"
            class="absolute right-0 w-48 mt-1 bg-white shadow-lg rounded z-10 border border-gray-200"
          >
            <TableOptions :options="options" :argument="user"></TableOptions>
          </div>
        </div>
      </div>

      <!-- User Details -->
      <div class="mb-4">
        <div class="text-xl font-bold mb-2 text-gray-900">
          {{ user.first_name }} {{ user.last_name }}
        </div>
      </div>

      <div class="mb-2 flex items-center">
        <i class="fas fa-envelope mr-2 text-primary"></i>
        <span class="text-gray-800">{{ user.email }}</span>
      </div>

      <div class="mb-2 flex items-center">
        <i class="fas fa-phone mr-2 text-primary"></i>
        <span class="text-gray-800">{{ user.phone }}</span>
      </div>

      <div class="absolute bottom-4 right-4 text-sm text-gray-500">
        {{ user.role }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onBeforeUnmount, onMounted, ref, type Ref } from "vue";
import type { FormattedUser, User } from "@/types/api/common";
import TableOptions from "@/components/table/TableOptions.vue";
import type { TableOption } from "@/components/table/table";

const { users, options } = defineProps<{
  users: User[];
  options?: TableOption[];
}>();

const selectedId: Ref = ref(null);
const dropdownRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (selectedId.value) {
    const id = `card-options-${selectedId.value}`;
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
