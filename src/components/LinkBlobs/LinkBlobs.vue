<script setup>
import DesktopBlobs from "./DesktopBlobs.vue";
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
  <DesktopBlobs v-if="isLandscapeOriented" />
  <PortraitBlobs v-else />
</template>

<style scoped lang="scss"></style>
