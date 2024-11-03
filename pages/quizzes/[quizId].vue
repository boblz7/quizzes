<script lang="ts" setup>
import QCarousel from "~/components/QCarousel/QCarousel.vue";
import { ChevronLeft } from "lucide-vue-next";

const route = useRoute();

const { data } = await useFetch(`/api/quizzes/${route.params.quizId}`);
</script>

<template>
  <div class="relative flex h-dvh w-lvw flex-col bg-primary">
    <NuxtLink href="/" class="p-3">
      <QButton variant="ghost">
        <ChevronLeft class="size-5" />
        Back
      </QButton>
    </NuxtLink>

    <QCarousel v-if="data" :quiz="data" />
  </div>
</template>
