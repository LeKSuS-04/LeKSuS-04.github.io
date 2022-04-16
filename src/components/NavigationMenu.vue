<script setup>
import { ref } from "vue";
const isMenuOpened = ref(false);
</script>

<template>
  <div :class="[isMenuOpened ? 'opened' : 'closed', 'menu-buttons']">
    <button class="toggle" @click="isMenuOpened = !isMenuOpened">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          v-if="isMenuOpened"
          d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
        />
        <path v-else d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
      </svg>
    </button>
  </div>
  <div v-if="isMenuOpened" class="overlay">
    <svg
      id="visual"
      viewBox="0 0 960 540"
      height="100vh"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M468 0C485.8 40.9 503.6 81.7 485.5 110.8C467.4 139.9 413.4 157.1 398.2 191.8C383.1 226.4 406.7 278.4 401.1 319.9C395.4 361.3 360.4 392.1 318 398.7C275.5 405.4 225.7 387.8 189.6 393.7C153.5 399.6 131.2 428.9 101.9 446.5C72.6 464.1 36.3 470.1 0 476L0 0Z"
      ></path>
    </svg>
    <nav>
      <ul>
        <li>
          <router-link to="/" @click="isMenuOpened = false">HOME</router-link>
        </li>
        <li>
          <router-link to="/links" @click="isMenuOpened = false"
            >LINKS</router-link
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped lang="scss">
$appearance-animation-time: 0.3s;
$overlay-color: rgb(0, 0, 0, 0.5);

$toggle-distance-from-border: 0;
$toggle-side-size: 60px;

@keyframes fade-in-overlay {
  0% {
    background-color: transparent;
  }
  100% {
    background-color: $overlay-color;
  }
}

@keyframes appear-from-top-left {
  0% {
    margin-top: -100vh;
    margin-left: -100vw;
  }
  100% {
    margin-top: 0;
    margin-left: 0;
  }
}

.menu-buttons {
  position: fixed;
  top: $toggle-distance-from-border;
  left: $toggle-distance-from-border;
  z-index: 1001;

  div {
    display: inline-block;
  }

  button {
    width: $toggle-side-size;
    height: $toggle-side-size;
    padding: 10px;
    border-radius: 100%;
    background-color: transparent;
    border: none;
    outline: none;

    svg {
      margin: 5px;
      path {
        transition: all $appearance-animation-time ease;
      }
    }
    &:hover {
      cursor: pointer;
    }
    transition-duration: 0.3s;
  }

  &.opened button {
    svg path {
      fill: var(--nav-fg-color);
    }
    &:hover {
      svg path {
        fill: var(--hover-nav-fg-color);
      }
    }
  }

  &.closed button {
    svg path {
      fill: var(--nav-button-color);
    }
    &:hover {
      svg path {
        fill: var(--hover-nav-button-color);
      }
    }
  }
}

@mixin animate-from-topleft {
  animation-duration: $appearance-animation-time;
  animation-name: appear-from-top-left;
}

.overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: $overlay-color;
  z-index: 1000;
  animation-duration: $appearance-animation-time;
  animation-name: fade-in-overlay;

  svg {
    @include animate-from-topleft;

    path {
      fill: var(--nav-bg-color);
    }
  }

  nav ul {
    @include animate-from-topleft;
    position: absolute;
    top: calc($toggle-side-size + 0.75em);
    left: 2em;
    list-style: none;

    li a {
      display: block;
      line-height: 1.5em;
      font-size: 2em;
      font-weight: bold;
      color: var(--nav-fg-color);
      text-decoration: none;
      transition-duration: 0.3s;

      &:visited {
        color: var(--nav-fg-color);
      }
      &:hover {
        transform: translateX(5px);
        color: var(--hover-nav-fg-color);
      }

      &.router-link-exact-active {
        text-decoration: underline;
      }
    }
  }
}

.extra-buttons {
  @include animate-from-topleft;
}
</style>
