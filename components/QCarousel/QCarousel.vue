<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { EyeClosed, Eye } from "lucide-vue-next";
import type { Quiz } from "~/server/api/quizzes/quizzes.types";

const props = defineProps<{
  quiz?: Quiz;
}>();

const quizReactive = toRef(
  props.quiz?.questions.map((question) => {
    return {
      ...question,
      showAnswer: false,
    };
  }),
);
</script>

<template>
  <div class="h-full">
    <Carousel class="relative flex h-full w-full flex-col">
      <div class="flex items-center justify-center p-3">
        <h1 class="text-2xl text-white/40 sm:text-5xl xl:text-7xl">
          {{ quiz?.name }}
        </h1>
      </div>

      <CarouselContent class="h-full" class-container="flex-1">
        <CarouselItem v-for="question in quizReactive" :key="question.id">
          <div class="flex h-full w-full flex-col p-5">
            <div
              class="flex h-full select-none flex-col items-center justify-center gap-10"
            >
              <p
                class="text-center text-2xl text-secondary sm:text-5xl xl:text-7xl"
              >
                {{ question.question }}
              </p>

              <p
                v-if="question.showAnswer"
                class="sm:text-1xl xl:text-2xlxl text-center text-secondary/80"
              >
                {{ question.answer }}
              </p>
            </div>

            <div class="flex justify-center">
              <QButton
                variant="outlineOnPrimary"
                @click="question.showAnswer = !question.showAnswer"
                size="icon"
              >
                <Eye v-if="question.showAnswer" />
                <EyeClosed v-else />
              </QButton>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>

      <div class="flex w-full items-center justify-between p-10">
        <QCarouselPrevious />

        <QCarouselNext />
      </div>
    </Carousel>
  </div>
</template>
