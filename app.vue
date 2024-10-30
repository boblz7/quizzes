<template>
  <div>
    <NuxtPage />

    <Toaster class="pointer-events-auto bg-secondary" :duration="3000" />
  </div>
</template>

<script lang="ts" setup>
import { Toaster } from "@/components/ui/sonner";
</script>
