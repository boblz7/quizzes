<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { QuizItem } from "~/server/api/quizes.types";
import { cn } from "~/lib/utils";
import type { HTMLAttributes } from "vue";
import { Trash } from "lucide-vue-next";
import { toast } from "vue-sonner";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const model = defineModel<QuizItem[] | undefined>({
  required: true,
  default: undefined,
});

const handleRemove = (id: string, itemName: string) => {
  if (!model?.value) return;
  const oldModel = model.value;
  const filteredModel = model.value?.filter((item) => item.id !== id);

  model.value = [...filteredModel];

  toast(`Removed "${itemName}"`, {
    action: {
      label: "Undo",
      onClick: () => (model.value = [...oldModel]),
    },
  });

  console.log("handleRemove", { model: model.value });
};

console.log("Q&A List", { model: model.value });
</script>

<template>
  <!-- <div class="w-full rounded-2xl bg-secondary pb-4"> -->
  <div v-if="!model?.length" class="flex size-full items-center justify-center">
    <p class="pt-4 text-center text-secondary">Add some questions :D</p>
  </div>
  <div
    v-else
    :class="cn('h-fit w-full rounded-2xl bg-secondary pb-4', props.class)"
  >
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
</template>
