<script lang="ts" setup>
import type { Question } from "~/server/api/quizzes/quizzes.types";
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "vue-sonner";
import { v4 as uuidv4 } from "uuid";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const model = defineModel<Question | undefined>({
  required: true,
  default: undefined,
});

const questionField = ref("");
const answerField = ref("");

const questionFieldRef = useTemplateRef<{
  textarea: HTMLTextAreaElement;
} | null>("question-field-ref");

const handleAdd = () => {
  if (!questionField.value || !answerField.value) {
    toast.error("Empty field", {
      description: "Enter both question and answer",
    });

    return;
  }

  model.value = {
    id: uuidv4(),
    question: questionField.value,
    answer: answerField.value,
  };

  questionField.value = "";
  answerField.value = "";

  questionFieldRef.value?.textarea.focus();
};
</script>

<template>
  <div
    :class="
      cn(
        'mx-auto flex w-full max-w-[400px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed p-3',
        'text-sm',
        props.class,
      )
    "
  >
    <Textarea
      ref="question-field-ref"
      v-model="questionField"
      placeholder="Question"
      :on-enter="handleAdd"
    />
    <Textarea
      v-model="answerField"
      placeholder="Answer"
      :on-enter="handleAdd"
    />

    <QButton variant="outline" @click="handleAdd" class="mt-2 w-[90%]">
      Add
    </QButton>
  </div>
</template>
