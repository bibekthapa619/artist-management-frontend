<template>
  <nav
    class="bg-white shadow-md py-4 px-6 xl:px-12 flex justify-between items-center"
  >
    <button
      @click="toggleSidebar"
      class="lg:hidden text-gray-600 hover:bg-gray-200 rounded"
    >
      <i class="fas fa-bars"></i>
    </button>
    <div class="ml-auto relative" @click="toggleDropdown">
      <span class="text-gray-600 font-medium cursor-pointer">
        {{ user?.firstName }} <i class="fas fa-caret-down"></i>
      </span>

      <div
        v-if="isDropdownOpen"
        class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10"
      >
        <a
          href="#"
          class="block px-4 py-2 text-gray-800 hover:bg-primary hover:text-white"
          >Profile</a
        >
        <a
          href="#"
          @click.prevent="logout"
          class="block px-4 py-2 text-gray-800 hover:bg-primary hover:text-white"
          >Logout</a
        >
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useUserStore } from "@/store/userStore";
import { clearCookie } from "@/lib/cookies/cookies";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import type { User } from "@/types/common/common";

const { toggleSidebar } = defineProps<{
  toggleSidebar: () => void;
}>();

const router = useRouter();

const userStore = useUserStore();
const { user }: { user: Ref<User | null> } = storeToRefs(userStore);

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const logout = () => {
  userStore.clearUser();
  clearCookie("token");
  isDropdownOpen.value = false;
  router.push("/login");
};
</script>
