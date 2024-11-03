<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

defineProps<{ text?: string }>();
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger class="w-full cursor-default">
        <slot />
      </TooltipTrigger>

      <TooltipContent
        avoid-collisions
        align="start"
        class="w-full max-w-[90vw] sm:max-w-[400px]"
      >
        <p>{{ text }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
