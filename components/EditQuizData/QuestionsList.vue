<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Question } from "~/server/api/quizzes/quizzes.types";
import type { HTMLAttributes } from "vue";
import { Trash } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { h } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const model = defineModel<Question[] | undefined>({
  required: true,
  default: undefined,
});

const toastContent = (italicText: string) => {
  return h("span", {}, ["Removed ", h("i", {}, `"${italicText}"`)]);
};

const handleRemove = (id: Question["id"], question: Question["id"]) => {
  if (!model?.value) return;
  const oldModel = model.value;
  const filteredModel = model.value?.filter((item) => item.id !== id);

  model.value = [...filteredModel];

  toast(toastContent(question), {
    action: {
      label: "Undo",
      onClick: () => (model.value = [...oldModel]),
    },
  });
};
</script>

<template>
  <div :class="props.class">
    <div
      v-if="!model?.length"
      class="flex size-full items-center justify-center"
    >
      <p class="pt-4 text-center text-secondary">Add some questions :D</p>
    </div>

    <div v-else class="h-fit w-full rounded-2xl bg-secondary pb-4">
      <h2 class="bg-primary/30 p-4 text-center">Quiz items</h2>

      <Accordion type="single" collapsible class="px-4">
        <AccordionItem
          v-for="(item, index) in model.slice().reverse()"
          :key="item.id"
          :value="item.id"
          class="border-b-primary"
        >
          <div class="flex items-baseline gap-4">
            <Button
              variant="outline"
              size="icon"
              class="rounded-full border-none text-destructive hover:bg-destructive hover:text-secondary"
              @click="() => handleRemove(item.id, item.question)"
            >
              <Trash class="size-4" />
            </Button>

            <div class="w-full flex-1">
              <AccordionTrigger class="flex-1 text-start font-semibold">
                {{ item.question }}
              </AccordionTrigger>

              <AccordionContent>{{ item.answer }}</AccordionContent>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
</template>
