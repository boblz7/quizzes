<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    background?: boolean;
    format?:
      | "default"
      | "webp"
      | "avif"
      | "jpeg"
      | "jpg"
      | "png"
      | "gif"
      | "svg";
    src: string;
    fit?: "cover" | "contain" | "fill" | "inside" | "outisde";
    width: string;
    height: string;
  }>(),
  {
    format: "webp",
  }
);

const isSvg = /\.svg$/.test(props.src);
const format = props.src === "default" || isSvg ? undefined : props.format;
</script>

<template>
  <NuxtImg
    :class="[{ 'background-image': background }, 'shared-image']"
    :format="format"
    :src="src"
    :fit="fit"
    :width="width"
    :height="height"
    sizes="100vw sm:500px md:640px lg:1728px"
  />
</template>

<style scoped lang="scss">
.shared-image {
  width: 100%;
  height: 100%;
}
.background-image {
  position: absolute;
  inset: 0;
  z-index: -1;
  max-height: 100lvh;
}
</style>
