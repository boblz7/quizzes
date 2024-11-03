<script lang="ts" setup>
import type { Quiz } from "~/server/api/quizzes/quizzes.types";

defineProps<{
  quizzes?: Quiz[] | null;
}>();
</script>

<template>
  <div class="w-full max-w-screen-xl">
    <div class="flex w-full flex-col rounded-xl bg-secondary">
      <QuizTableHeaderRow />

      <div>
        <QuizTableRow
          v-for="quiz in quizzes"
          :quiz="quiz"
          class="even:bg-primary/10"
        />
      </div>
    </div>
  </div>
</template>
