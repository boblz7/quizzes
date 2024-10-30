<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

defineProps<{
  resetCallback: VoidFunction;
  saveCallback: VoidFunction;
  isVariation?: boolean;

  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    :class="
      cn(
        !isVariation
          ? 'flex flex-row items-center justify-between p-6 pt-0 sm:hidden'
          : 'mx-auto hidden w-full max-w-[400px] items-center justify-between p-6 sm:flex sm:flex-col sm:gap-4',
      )
    "
  >
    <Button
      variant="outline"
      @click="resetCallback"
      :class="cn(!isVariation ? 'min-w-24' : 'w-[90%]')"
    >
      Reset
    </Button>

    <Button
      variant="secondary"
      :class="cn(!isVariation ? 'min-w-24' : 'w-[90%]')"
      @click="saveCallback"
    >
      Save changes
    </Button>
  </div>
</template>
