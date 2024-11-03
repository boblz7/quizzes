<script setup lang="ts">
import type { WithClassAsProps } from "../ui/carousel/interface";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-vue-next";
import { useCarousel } from "../ui/carousel/useCarousel";

const props = defineProps<WithClassAsProps>();

const { orientation, canScrollNext, scrollNext } = useCarousel();
</script>

<template>
  <Button
    :disabled="!canScrollNext"
    :class="cn('h-8 w-8 touch-manipulation rounded-full p-0', props.class)"
    variant="outlineOnPrimary"
    @click="scrollNext"
  >
    <slot>
      <ArrowRight class="h-4 w-4 text-current" />
      <span class="sr-only">Next Slide</span>
    </slot>
  </Button>
</template>
