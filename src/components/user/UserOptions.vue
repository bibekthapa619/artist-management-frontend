<template>
  <div class="relative inline-block">
    <button
      @click="toggleOptions"
      class="text-gray-600 hover:text-gray-900 focus:outline-none"
    >
      <i class="fas fa-cog"></i>
    </button>
    <div
      v-if="showOptions"
      class="absolute right-0 w-48 mt-1 bg-white shadow-lg rounded-md z-10 border border-gray-200"
    >
      <div
        @click="viewUser(user)"
        class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
      >
        View
      </div>
      <div
        @click="editUser(user)"
        class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
      >
        Edit
      </div>
      <div
        @click="deleteUser(user.id)"
        class="px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer"
      >
        Delete
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User } from "@/types/api/common";
import { defineProps, ref } from "vue";

const { user, viewUser, editUser, deleteUser } = defineProps<{
  user: User;
  viewUser: (user: User) => void;
  editUser: (user: User) => void;
  deleteUser: (id: number) => void;
}>();

const showOptions = ref(false);

const toggleOptions = () => {
  showOptions.value = !showOptions.value;
};
</script>
