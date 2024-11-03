<script setup lang="ts">
import type { Question, Quiz } from "~/server/api/quizzes/quizzes.types";
import { X } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { v4 as uuidv4 } from "uuid";

const props = defineProps<{ quizToUpdate?: Quiz }>();

const isLoading = ref(false);

const quizTitle = ref(props.quizToUpdate?.name || "");
const newQuizItems = ref<Question[]>(props.quizToUpdate?.questions || []);
const newQuizItem = ref<Question | undefined>(undefined);

const addQuizItem = (quizItem?: Question) => {
  if (!quizItem) return;

  const { id, question, answer } = quizItem;

  newQuizItems.value = [...newQuizItems.value, { id, question, answer }];
};

const resetFields = () => {
  quizTitle.value = "";
  newQuizItem.value = undefined;
  newQuizItems.value = [];
};

const resetQuizItems = () => {
  if (!newQuizItems.value.length) return;

  const oldValue = newQuizItems.value;
  newQuizItems.value = [];

  toast.success(`Reset successful`, {
    action: {
      label: "Undo",
      onClick: () => (newQuizItems.value = [...oldValue]),
    },
  });
};

const validation = () => {
  if (!quizTitle.value) {
    toast.error("Empty name", {
      description: "Enter quiz name",
    });

    return false;
  }

  if (!newQuizItems.value.length) {
    toast.error("No questions added", {
      description: "Add some questions",
    });

    return false;
  }

  return true;
};

const saveQuiz = async (newQuiz: Quiz) => {
  return await fetch("/api/quizzes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newQuiz),
  });
};

const updateQuiz = async (updatedQuiz: Quiz) => {
  return fetch(`/api/quizzes/${updatedQuiz.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedQuiz),
  });
};

const saveHandler = async () => {
  if (!validation()) return;

  isLoading.value = !isLoading.value;

  const newQuizData = {
    id: props.quizToUpdate?.id || uuidv4(),
    name: quizTitle.value,
    questions: newQuizItems.value,
  };

  props.quizToUpdate
    ? await updateQuiz(newQuizData)
    : await saveQuiz(newQuizData);

  refreshNuxtData();
  !props.quizToUpdate && resetFields();

  toast.success(
    `Quiz ${props.quizToUpdate ? "updated" : "added"} successfully`,
  );

  isLoading.value = false;
};

watch(newQuizItem, () => {
  addQuizItem(newQuizItem.value);
});
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot></slot>
    </DialogTrigger>

    <DialogContent
      disable-close
      disable-outside-close
      class="flex h-full max-h-[90dvh] w-[90%] max-w-full grid-rows-[au_minmax(0,1fr)_auto] flex-col rounded-2xl bg-primary p-0"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle class="text-secondary">
          {{ props.quizToUpdate ? "Update quiz" : "Create quiz" }}
        </DialogTitle>

        <DialogDescription class="text-secondary">
          Questions & Answers with a preview.
        </DialogDescription>

        <DialogClose
          class="absolute right-4 top-4 rounded-sm text-white opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent"
        >
          <X class="size-4 md:size-5 lg:size-6" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogHeader>

      <div class="flex h-full flex-col gap-6 overflow-y-auto px-6 sm:flex-row">
        <div
          class="flex max-w-[400px] basis-2/5 flex-col justify-between text-secondary sm:sticky sm:top-0"
        >
          <div class="flex flex-col gap-6 pt-4">
            <Input v-model="quizTitle" placeholder="Quiz name" />

            <EditQuizDataAddQuestionForm v-model="newQuizItem" />
          </div>

          <div class="flex items-center justify-center pt-4">
            <EditQuizDataRecycledQuestions v-model="newQuizItem" />
          </div>

          <EditQuizDataActionButtons
            :reset-callback="resetQuizItems"
            :save-callback="saveHandler"
            is-variation
            :isLoading="isLoading"
          />
        </div>

        <EditQuizDataQuestionsList
          v-model="newQuizItems"
          class="flex size-full flex-1"
        />
      </div>

      <DialogFooter>
        <EditQuizDataActionButtons
          :reset-callback="resetQuizItems"
          :save-callback="saveHandler"
          :isLoading="isLoading"
        />
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
