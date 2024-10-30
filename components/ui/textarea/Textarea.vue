<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { useTextareaAutosize, useVModel } from "@vueuse/core";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  defaultValue?: string;
  modelValue?: string;
  onEnter?: VoidFunction;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string): void;
}>();

const { textarea, input } = useTextareaAutosize();

defineExpose({ textarea });

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue || "",
});

watch(modelValue, () => {
  input.value = modelValue.value || "";
});
</script>

<template>
  <textarea
    ref="textarea"
    v-model="modelValue"
    rows="1"
    @keyup.enter="
      (event) => {
        // event.preventDefault();
        console.log('keydown.enter', { event });
        props.onEnter && props.onEnter();
      }
    "
    @keydown.enter="(event) => event.preventDefault()"
    :class="
      cn(
        'flex min-h-20 w-full rounded-md border border-input bg-input px-3 py-2 text-sm text-primary ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        'min-h-0 resize-none',
        props.class,
      )
    "
  />
</template>
