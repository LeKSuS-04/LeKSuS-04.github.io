<script lang="ts">
  import Fa from 'svelte-fa';
  import * as icons from '@fortawesome/free-brands-svg-icons';
  import type { Link } from '../types';

  export let routeName: string;

  // @ts-ignore
  const links: Link[] = '#LINKS#';
</script>

<nav>
  <header>{routeName}</header>

  <ul>
    {#each links as { icon, color, link }}
      <li>
        <a href={link} style:--active-color={color}>
          <Fa icon={icons[icon]} />
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style lang="scss">
  nav {
    margin: 0 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    header {
      font-size: 1.3em;
      padding: 0.3em 1em;
      margin-bottom: -2px;

      background-color: var(--background-color);
      border: 2px solid var(--border-color);
      border-bottom: none;
      border-radius: 0.5rem 0.5rem 0 0;

      transition-duration: 300ms;
    }

    ul {
      $space-between: -2px;

      list-style: none;
      display: flex;
      align-items: flex-end;
      margin: 0;
      margin-right: -0.5 * $space-between;

      li a {
        display: block;
        padding: 0.3em 0.5rem 0.1em 0.5rem;
        margin: 0 (0.5 * $space-between);
        margin-bottom: -2px;

        background-color: var(--background-color);
        border: 2px solid var(--border-color);
        border-bottom: none;
        border-radius: 0.5rem 0.5rem 0 0;

        color: var(--border-color);
        font-size: 1.5rem;

        transition-duration: 300ms;
        &:hover {
          background-color: var(--active-color);
          color: #fff;
          margin-top: -0.75rem;
          padding-bottom: 0.75rem;
        }
      }
    }
  }
</style>
