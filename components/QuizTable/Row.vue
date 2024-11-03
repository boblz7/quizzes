<script lang="ts" setup>
import { Trash, Play } from "lucide-vue-next";
import QTooltip from "../QTooltip.vue";
import type { Quiz } from "~/server/api/quizzes/quizzes.types";
import { toast } from "vue-sonner";

const props = defineProps<{
  quiz: Quiz;
}>();

const isLoading = ref(false);

const handleRemove = async () => {
  isLoading.value = true;

  const toastDescription = (italicText: string) => {
    return h("p", { class: "italic" }, [
      `"${italicText}" `,
      h("span", { class: "not-italic" }, "will be removed"),
    ]);
  };

  toast.warning("Remove permanently?", {
    description: toastDescription(props.quiz.name),
    action: {
      label: "Delete",
      actionButtonStyle: {
        background: "bg-destructive",
      },
      onClick: async () => {
        const data = await fetch(`/api/quizzes/${props.quiz.id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(props.quiz.id),
        });

        refreshNuxtData();

        isLoading.value = false;
      },
    },
    onDismiss: () => {
      isLoading.value = false;
    },
    onAutoClose: () => {
      isLoading.value = false;
    },
  });
};
</script>

<template>
  <div class="flex w-full p-1">
    <EditQuizData :quiz-to-update="quiz">
      <div
        class="flex w-full flex-1 cursor-pointer items-center overflow-hidden p-2"
      >
        <QTooltip :text="quiz.name">
          <p class="cursor-pointer truncate text-left">{{ quiz.name }}</p>
        </QTooltip>
      </div>
    </EditQuizData>

    <div
      class="flex w-[120px] justify-between gap-3 border-l border-primary px-3 py-2"
    >
      <QButton
        variant="outline"
        size="icon"
        class="border-transparent text-primary"
        :is-disabled="isLoading"
        @click="handleRemove"
      >
        <Trash class="size-4" />
      </QButton>

      <NuxtLink :href="`/quizzes/${quiz.id}`">
        <QButton
          variant="outline"
          size="icon"
          class="border-transparent text-primary"
        >
          <Play class="size-4" />
        </QButton>
      </NuxtLink>
    </div>
  </div>
</template>
