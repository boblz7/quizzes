<script setup lang="ts">
import type { QuizItem } from "~/server/api/quizes.types";
import { X } from "lucide-vue-next";

const quizTitle = ref("");

const newQuizItems: Ref<QuizItem[]> = ref([
  {
    id: "6a0c8097-a84e-4208-9d7f-dba938af0307",
    question: "Which animal has the longest lifespan?",
    answer: "The ocean quahog clam, over 500 years.",
  },
  {
    id: "546920c3-df65-4fba-9dc7-b1f30e4252c6",
    question: "What is the rarest blood type in the world?",
    answer: 'Rh-null, known as "golden blood."',
  },
  {
    id: "4dd06e5f-7235-4734-a7fe-954246c2459c",
    question: "Which country has the most time zones?",
    answer: "France, due to its territories.",
  },
  {
    id: "7c325904-610a-4278-a116-09981f373513",
    question: "What is the shortest war in history?",
    answer: "The Anglo-Zanzibar War, lasting 38 minutes.",
  },
  {
    id: "dba7392d-a495-41cb-b2ac-ffc4376d6342",
    question: "Which planet has diamond rain?",
    answer: "Saturn and Jupiter.",
  },
  {
    id: "c90f761d-c392-4126-aabc-33bea1762ef2",
    question: 'What’s a word that rhymes with "orange"?',
    answer: "Blorenge (a hill in Wales).",
  },
  {
    id: "923c060b-ed25-4791-83ca-eefedb44500e",
    question: "Who is the most translated author in the world?",
    answer: "Agatha Christie.",
  },
  {
    id: "11162103-ca65-4542-aa62-4d0290549ebf",
    question: "What common food is a natural meat tenderizer?",
    answer: "Pineapple, due to bromelain.",
  },
  {
    id: "babba2a6-074c-4aaa-b6a5-364ae6c9ddf5",
    question: "Which bird can mimic nearly any sound it hears?",
    answer: "The lyrebird.",
  },
  {
    id: "fe79959a-45ec-4507-a046-254e7cc44975",
    question: "What is the only letter not in any U.S. state name?",
    answer: 'The letter "Q."',
  },
  {
    id: "b9283ded-cbff-488a-905a-e33f65830d0a",
    question: "Which animal can sleep with half its brain awake?",
    answer: "Dolphins.",
  },
  {
    id: "70e09acf-c26b-4856-ab63-c2d078ffe6fc",
    question:
      "Who was the first person to reach both the North and South Poles?",
    answer: "Roald Amundsen.",
  },
  {
    id: "a0581a90-bef8-44a0-8a5f-e2536952be47",
    question: "Which country has more pyramids than Egypt?",
    answer: "Sudan.",
  },
  {
    id: "d3b6f9dd-9cea-4acf-b070-e9fb8397ae0c",
    question: "What is the largest desert in the world?",
    answer: "Antarctica, considered a cold desert.",
  },
  {
    id: "51156858-fe03-4408-9404-e551f9f8693c",
    question: "Which language is spoken by the fewest people?",
    answer: "The Taushiro language, with just one native speaker.",
  },
]);
const newQuizItem: Ref<QuizItem | undefined> = ref();

const addQuizItem = (quizItem?: QuizItem) => {
  if (!quizItem) return;

  const { id, question, answer } = quizItem;

  newQuizItems.value = [...newQuizItems.value, { id, question, answer }];
};

const resetQuizItems = () => {
  newQuizItems.value.splice(0);
};

const saveQuiz = () => {
  console.log("saveQuiz");

  const localQuizes = localStorage.getItem("quizes");
  if (localQuizes)
    console.log("saveQuiz", { localQuizes: JSON.parse(localQuizes) });

  // if (!localQuizes)
  // localStorage.setItem(
  //   "quizes",
  //   JSON.stringify([
  //     {
  //       id: "",
  //       name: "",
  //       data: [
  //         {
  //           id: "6a0c8097-a84e-4208-9d7f-dba938af0307",
  //           question: "Which animal has the longest lifespan?",
  //           answer: "The ocean quahog clam, over 500 years.",
  //         },
  //       ],
  //     },
  //   ]),
  // );

  console.log("saveQuiz - END");
};

watch(newQuizItem, () => {
  console.log("Updated - newQuizItem:", newQuizItem.value);

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
      class="max-h-[90dvh] w-[90%] max-w-full grid-rows-[auto_minmax(0,1fr)_auto] rounded-2xl bg-primary p-0"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle class="text-secondary">Create quiz</DialogTitle>

        <DialogDescription class="text-secondary">
          Add new Questions & Answers with a preview.
        </DialogDescription>

        <DialogClose
          class="absolute right-4 top-4 rounded-sm text-white opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent"
        >
          <X class="size-4 md:size-5 lg:size-6" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogHeader>

      <div class="flex flex-col gap-6 overflow-y-auto px-6 sm:flex-row">
        <div
          class="flex max-w-[400px] basis-2/5 flex-col justify-between text-secondary sm:sticky sm:top-0"
        >
          <div class="flex flex-col gap-6">
            <Input v-model="quizTitle" placeholder="Quiz name" />

            <CreateQuizAddQuestionForm v-model="newQuizItem" />
          </div>

          <CreateQuizActionButtons
            :reset-callback="resetQuizItems"
            :save-callback="saveQuiz"
            is-variation
          />
        </div>

        <CreateQuizQuestionsList
          v-model="newQuizItems"
          class="flex size-full flex-1"
        />
      </div>

      <DialogFooter>
        <CreateQuizActionButtons
          :reset-callback="resetQuizItems"
          :save-callback="saveQuiz"
        />
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
