<script lang="ts" setup>
import { Toaster as Sonner, type ToasterProps } from "vue-sonner";

const props = defineProps<ToasterProps>();
</script>

<template>
  <Sonner
    class="toaster group"
    v-bind="props"
    :duration="3000"
    :toast-options="{
      classes: {
        title: 'text-sm font-semibold',
        toast: 'toast group border-transparent shadow-lg backdrop-blur-lg',
        description:
          'text-muted-foreground group-[.error]:italic group-[.error]:text-white ',
        actionButton:
          'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
        cancelButton:
          'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',

        default: 'border-white bg-secondary/70 text-foreground',
        error: 'error group bg-destructive/70 text-white',
        warning: 'error group bg-orange-500/70 text-white',
        success: 'border-white bg-secondary/70',
      },
    }"
  />
</template>
