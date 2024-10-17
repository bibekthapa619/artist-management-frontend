<template>
  <h1 class="text-2xl font-bold mb-4">Dashboard</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div
      class="bg-white shadow-lg inline-flex flex-col justify-center items-center p-4"
    >
      <PieChart title="Users" :data="userData" :height="180" :width="180" />
    </div>
    <div
      class="bg-white shadow-lg inline-flex flex-col justify-center items-center p-4"
    >
      <PieChart title="Artists" :data="artistData" :height="180" :width="180" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/userStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import PieChart from "@/components/charts/PieChart.vue";
import { onMounted, reactive, ref } from "vue";
import { getMusicStats, getUserStats } from "@/api/dashboard";

const router = useRouter();
const userStore = useUserStore();
const { user, isLoggedIn } = storeToRefs(userStore);

const userData = ref({});
const artistData = ref({});
const musicData = ref({});

onMounted(async () => {
  let res = await getUserStats();
  userData.value = res.data.user_count;
  artistData.value = res.data.artist_count;
});

onMounted(async () => {
  let res = await getMusicStats();
  musicData.value = res.data.music_count;
});
</script>
