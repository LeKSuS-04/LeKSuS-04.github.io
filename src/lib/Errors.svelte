<script lang="ts">
  import { errors } from '../store/error';
  import { fade } from 'svelte/transition';
</script>

<ul>
  {#each $errors as { id, msg } (id)}
    <li transition:fade={{ duration: 300 }}>{msg}</li>
  {/each}
</ul>

<style lang="scss">
  ul {
    list-style: none;

    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0;
    margin-bottom: 0.5rem;
    padding: 0;

    li {
      margin: 0.5rem 1rem;
      padding: 0.3rem 1rem;

      color: white;
      background-color: #dd2c2f;
      text-align: center;

      border-radius: 0.5rem;
    }
  }
</style>
