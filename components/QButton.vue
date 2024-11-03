<script lang="ts" setup>
import { Loader2 } from "lucide-vue-next";
import { cn } from "~/lib/utils";

defineProps<{
  isDisabled?: boolean;
  isLoading?: boolean;
}>();
</script>

<template>
  <Button
    :class="
      cn(
        (isDisabled || isLoading) && 'pointer-events-none',
        isDisabled && 'opacity-20',
      )
    "
  >
    <Loader2 v-if="isLoading" :class="cn('h-4 w-4 animate-spin')" />
    <slot v-else></slot>
  </Button>
</template>
