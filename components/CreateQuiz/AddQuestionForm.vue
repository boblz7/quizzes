<script lang="ts" setup>
import type { QuizItem } from "~/server/api/quizes.types";
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "vue-sonner";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const model = defineModel<QuizItem | undefined>({
  required: true,
  default: undefined,
});

const questionField: Ref<string> = ref("");
const answerField: Ref<string> = ref("");

const questionFieldRef = useTemplateRef<{
  textarea: HTMLTextAreaElement;
} | null>("question-field-ref");

const handleAdd = () => {
  if (!questionField.value || !answerField.value) {
    toast("Empty field", {
      description: "Enter both question and answer",
    });

    return;
  }

  model.value = {
    id: crypto.randomUUID(),
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
