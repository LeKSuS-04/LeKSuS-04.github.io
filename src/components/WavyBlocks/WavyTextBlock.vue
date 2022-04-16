<script setup>
import { ref, toRefs } from "vue";
import WavyBlock from "./WavyBlock.vue";
const props = defineProps({
  prevbg: {
    type: String,
    default: "#000",
  },
  bg: {
    type: String,
    default: "#fff",
  },
  fg: {
    type: String,
    default: "#000",
  },
  title: {
    type: String,
    default: "TITLE",
  },
  titleOnRight: {
    type: Boolean,
    default: false,
  },
});

const { titleOnRight: titleOnLeft } = toRefs(props);
const flexDirection = ref(titleOnLeft.value ? "row-reverse" : "row");
</script>

<template>
  <WavyBlock :bg="bg" :prevbg="prevbg">
    <div class="content">
      <h2>{{ title }}</h2>
      <p :class="titleOnRight ? 'left' : 'right'">
        <slot>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quos
          non unde iste, similique maiores mollitia laborum qui corrupti officia
          ipsam nesciunt sint numquam sed ad dolorum ipsa culpa? Repellat?
        </slot>
      </p>
    </div>
  </WavyBlock>
</template>

<style scoped lang="scss">
.content {
  margin-top: -1em;
  padding: 70px 0;
  background-color: v-bind("bg");
  color: v-bind("fg");

  h2 {
    padding: 0 100px;
    text-align: center;
    font-size: 2em;
  }
  p {
    padding: 50px 70px;
  }

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: v-bind("flexDirection");
    align-items: center;
    justify-content: space-around;

    h2 {
      width: 50%;
    }
    p {
      width: 50%;
      padding: 50px 100px;

      $separator: 1px solid v-bind("fg");
      &.left {
        border-right: $separator;
      }
      &.right {
        border-left: $separator;
      }
    }
  }
}
</style>
