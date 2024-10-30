<script lang="ts" setup>
import { defineComponent, h } from "vue";

interface Quizes {
  id: number;
  name: string;
  slides: number;
}

const data: Quizes[] = [
  { id: 3, name: "Wonderwall", slides: 5 },
  { id: 4, name: "Don't Look Back in Anger", slides: 20 },
  { id: 12, name: "Champagne Supernova", slides: 30 },
];
const pagination = false;
</script>

<template>
  <div></div>
</template>
