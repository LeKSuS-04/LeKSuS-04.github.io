<script lang="ts">
  import Router, { type RouteLoadedEvent } from 'svelte-spa-router';
  import Errors from './lib/Errors.svelte';
  import Navigation from './lib/Navigation.svelte';
  import { routes } from './router';

  let routeName = 'Some title';
  function onRouteLoading(event: RouteLoadedEvent) {
    const userData = event.detail.userData;
    routeName = userData['routeName'] ?? 'Some title';
  }
</script>

<svelte:head>
  <link rel="icon" type="image/svg+xml" href="/leksus.svg" />
  <title>LeKSuS</title>
</svelte:head>

<Errors />
<Navigation {routeName} />

<main>
  <Router {routes} on:routeLoading={onRouteLoading} />
</main>

<style lang="scss">
  main {
    border: 2px solid var(--border-color);
    box-sizing: border-box;
    padding: 1rem 2rem;
    border-radius: 0 0 1rem 1rem;
  }

  @media screen and (max-width: 768px) {
    main {
      padding: 0.5rem 1rem;
    }
  }
</style>
