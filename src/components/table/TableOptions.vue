<template>
  <div
    v-for="(option, index) in options"
    :key="index"
    @click="option.action(argument)"
    class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
    :class="option.isDanger ? 'text-red-600 hover:bg-red-100' : ''"
  >
    {{ option.title }}
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import type { TableOption } from "./table";

const { options } = defineProps<{
  options: TableOption[];
  argument: any;
}>();
</script>
