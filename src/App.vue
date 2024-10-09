<template>
  <div v-if="isLoading" class="">
    <Loading></Loading>
  </div>
  <div v-else>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/userStore";
import Loading from "./components/loading/Loading.vue";
const userStore = useUserStore();
const { isLoading } = storeToRefs(userStore);
</script>
