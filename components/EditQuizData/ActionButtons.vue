<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

defineProps<{
  resetCallback: VoidFunction;
  saveCallback: VoidFunction;
  isVariation?: boolean;
  isLoading?: boolean;
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
    <QButton
      variant="outline"
      :class="cn(!isVariation ? 'min-w-24' : 'w-[90%]')"
      :is-loading="isLoading"
      @click="resetCallback"
    >
      Reset
    </QButton>

    <QButton
      variant="secondary"
      :class="cn(!isVariation ? 'min-w-24' : 'w-[90%]')"
      :is-loading="isLoading"
      @click="saveCallback"
    >
      Save changes
    </QButton>
  </div>
</template>
