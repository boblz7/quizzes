<script lang="ts" setup>
import { cn } from "~/lib/utils";
const { data: quizzes } = await useFetch(`/api/quizzes`);
</script>

<template>
  <div
    :class="
      cn(
        'flex h-lvh flex-col items-center justify-center bg-primary px-3',
        quizzes?.length && 'justify-start p-5',
      )
    "
  >
    <div
      :class="
        cn(
          'mb-5 w-full max-w-screen-xl text-center',
          quizzes?.length && 'flex items-center justify-between text-start',
        )
      "
    >
      <h1
        :class="
          cn(
            'mb-20 w-full text-4xl text-secondary sm:text-5xl xl:text-7xl',
            quizzes?.length && 'm-0 text-2xl sm:text-2xl xl:text-2xl',
          )
        "
      >
        Let's make some quizes!
      </h1>

      <EditQuizData>
        <Button
          variant="secondary"
          :size="quizzes?.length ? 'default' : 'jumbo'"
        >
          {{ !quizzes?.length ? "Start creating" : "Create new" }}
        </Button>
      </EditQuizData>
    </div>

    <QuizTable v-if="quizzes?.length" :quizzes="quizzes" />
  </div>
</template>

<style scoped lang="scss"></style>
