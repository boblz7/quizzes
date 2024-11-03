<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import type { WithClassAsProps } from "./interface";
import { cn } from "@/lib/utils";
import { useCarousel } from "./useCarousel";

defineOptions({
  inheritAttrs: false,
});

interface CarouselContentProps extends WithClassAsProps {
  classContainer?: HTMLAttributes["class"];
}

const props = defineProps<CarouselContentProps>();

const { carouselRef, orientation } = useCarousel();
</script>

<template>
  <div ref="carouselRef" :class="cn('overflow-hidden', classContainer)">
    <div
      :class="
        cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          props.class,
        )
      "
      v-bind="$attrs"
    >
      <slot />
    </div>
  </div>
</template>
