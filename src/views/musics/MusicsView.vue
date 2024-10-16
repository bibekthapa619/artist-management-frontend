<template>
  <div class="">
    <div class="flex justify-between items-center mb-4 space-x-4">
      <h1 class="text-2xl font-bold mb-4">Musics</h1>
      <router-link
        to="/musics/create"
        class="bg-primary text-white px-4 py-2 h-10 rounded shadow hover:bg-primary-hover flex items-center justify-center"
      >
        Add
      </router-link>
    </div>
    <div class="flex justify-between items-center mb-4 space-x-4">
      <SortOptions
        :options="sortOptions"
        :modelValue="selectedSort"
        @update:modelValue="selectedSort = $event"
      />
      <SearchInput
        v-model:searchQuery="searchQuery"
        class="w-48 sm:w-64"
        :placeholder="`Search music...`"
      />
    </div>
    <div class="hidden sm:block">
      <ArtistMusicTable
        :musics="musics"
        :paginationData="paginationData"
        :options="options"
      />
    </div>
    <div class="block sm:hidden">
      <ArtistMusicCard
        v-if="musics.length"
        :musics="musics"
        :options="options"
      />
    </div>
    <Pagination
      :pagination="paginationData"
      :updateCurrentPage="updateCurrentPage"
    />
  </div>
</template>

<script setup lang="ts">
import { deleteMusic, getMusics } from "@/api/musics";
import Pagination from "@/components/pagination/Pagination.vue";
import SearchInput from "@/components/search/SearchInput.vue";
import SortOptions from "@/components/table/SortOptions.vue";
import type { TableOption } from "@/components/table/table";
import { notifyError, notifySuccess } from "@/main";
import ArtistMusicCard from "@/sections/artists/ArtistMusicCard.vue";
import ArtistMusicTable from "@/sections/artists/ArtistMusicTable.vue";
import type { Music, PaginationData } from "@/types/api/common";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const musics = ref<Music[]>([]);
const pageSize = ref<number>(10);
const paginationData = ref<PaginationData>({
  total: 0,
  last_page: 0,
  current_page: 0,
  from: 0,
  to: 0,
  page_size: 0,
});
const searchQuery = ref<string>("");
const refresh = ref<boolean>(false);
const router = useRouter();

const selectedSort = ref("title-asc");
const sortOptions = [
  { value: "title-asc", label: "Title(Asc)" },
  { value: "title-desc", label: "Title(Desc)" },
  { value: "last-modified", label: "Last Modified" },
  { value: "date-created", label: "Date Created" },
];

const editMusic = (music: Music) => {
  router.push({
    name: "musics.edit",
    params: { id: music.id },
  });
};

const deleteMusicOption = async (music: Music) => {
  const isConfirmed = confirm(
    `Are you sure you want to delete ${music.title}?`
  );
  if (isConfirmed) {
    try {
      let res = await deleteMusic(music.id as number);
      refresh.value = !refresh.value;
      notifySuccess(res.message);
    } catch (err) {
      notifyError("Failed to delete.");
    }
  }
};
const options: TableOption[] = [
  {
    title: "Edit",
    action: editMusic,
  },
  {
    title: "Delete",
    action: deleteMusicOption,
    isDanger: true,
  },
];

const fetchMusic = async (
  page = 1,
  perPage = pageSize.value,
  query = "",
  sortBy = sortOptions[0].value
) => {
  let res = await getMusics(page, perPage, query, sortBy);
  musics.value = res.data.musics;
  paginationData.value = res.data.meta;
};

watch(searchQuery, (newQuery) => {
  fetchMusic(1, pageSize.value, newQuery, selectedSort.value);
});

watch(refresh, () => {
  fetchMusic(
    paginationData.value.current_page,
    pageSize.value,
    searchQuery.value,
    selectedSort.value
  );
});

watch(selectedSort, (newSort) => {
  fetchMusic(1, pageSize.value, searchQuery.value, newSort);
});

onMounted(async () => {
  await fetchMusic();
});

const updateCurrentPage = async (page: number) => {
  await fetchMusic(page, pageSize.value, searchQuery.value, selectedSort.value);
};
</script>
