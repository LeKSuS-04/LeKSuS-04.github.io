<script setup>
import LandscapeBlobs from "./LandscapeBlobs.vue";
import { ref, onMounted } from "vue";
import PortraitBlobs from "./PortraitBlobs.vue";

const isLandscapeOriented = ref(true);

function updateLayout() {
  isLandscapeOriented.value = window.matchMedia(
    "(orientation: landscape)"
  ).matches;
}

onMounted(() => {
  updateLayout();
  window.addEventListener("resize", updateLayout);
});
</script>

<template>
  <LandscapeBlobs v-if="isLandscapeOriented" />
  <PortraitBlobs v-else />
</template>

<style scoped lang="scss"></style>
