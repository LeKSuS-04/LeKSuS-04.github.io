<script setup>
import { onMounted } from "vue";
import NavMenu from "@/components/NavigationMenu";

onMounted(() => {
  document.querySelector("body").classList.add("dark-theme");
});
</script>

<template>
  <NavMenu />
  <router-view />
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
@import url("https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap");

#app {
  font-family: Oxygen, Helvetica, Arial, sans-serif;
  font-size: 20px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background-color: var(--background-color);
}

$gray0: #f8f8f8;
$gray1: #dbe1e8;
$gray2: #b2becd;
$gray3: #6c7983;
$gray4: #454e56;
$gray5: #2a2e35;
$gray6: #12181b;
$gray7: #090b0f;

$magenta: #c2185b;
$yellow: #ffeb3b;
$orange: #f57c00;
$blue: #0277bd;
$green: #388e3c;

.dark-theme {
  --background-color: #{$orange};
  --background-alt-color: #{$gray5};
  --nav-button-color: #{$gray3};
  --hover-nav-button-color: #{$gray2};
  --nav-fg-color: #{$gray1};
  --hover-nav-fg-color: #{$gray2};
  --nav-bg-color: #{$magenta};
  --text-color: #{$gray2};
  --h-color: #{$gray1};

  --magenta: #{$magenta};
  --yellow: #{$yellow};
  --orange: #{$orange};
  --blue: #{$blue};
  --green: #{$green};

  --gray0: #{$gray0};
  --gray1: #{$gray1};
  --gray2: #{$gray2};
  --gray3: #{$gray3};
  --gray4: #{$gray4};
  --gray5: #{$gray5};
  --gray6: #{$gray6};
  --gray7: #{$gray7};
}
</style>
