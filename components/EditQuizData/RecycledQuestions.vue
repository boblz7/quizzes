<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createReusableTemplate, useMediaQuery } from "@vueuse/core";
import { VisuallyHidden } from "radix-vue";
import { ref } from "vue";
import type { Question } from "~/server/api/quizzes/quizzes.types";
import { v4 as uuidv4 } from "uuid";

const model = defineModel<Question | undefined>({
  required: true,
  default: undefined,
});

const { data: questions } = await useFetch(`/api/questions`);

const [UseTemplate, StatusList] = createReusableTemplate();
const isDesktop = useMediaQuery("(min-width: 768px)");

const isOpen = ref(false);

function onStatusSelect(question: Question) {
  model.value = { ...question, id: uuidv4() };

  isOpen.value = false;
}
</script>

<template>
  <div>
    <UseTemplate>
      <Command>
        <CommandInput placeholder="Filter questions..." class="text-base" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="question of questions"
              :key="question.id"
              :value="question.question"
              @select="onStatusSelect(question)"
            >
              {{ question.question }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </UseTemplate>

    <Popover v-if="isDesktop" v-model:open="isOpen">
      <PopoverTrigger as-child>
        <Button variant="outlineOnPrimary"> Recycled questions </Button>
      </PopoverTrigger>
      <PopoverContent class="w-[200px] p-0" align="start">
        <StatusList />
      </PopoverContent>
    </Popover>

    <Drawer
      v-else
      :open="isOpen"
      @update:open="(newOpenValue) => (isOpen = newOpenValue)"
    >
      <DrawerTrigger as-child>
        <Button variant="outlineOnPrimary"> Recycled questions </Button>
      </DrawerTrigger>
      <DrawerContent aria-describedby="questions">
        <VisuallyHidden>
          <DrawerTitle></DrawerTitle>
        </VisuallyHidden>

        <div class="mt-4 border-t">
          <StatusList />
        </div>
      </DrawerContent>
    </Drawer>
  </div>
</template>
