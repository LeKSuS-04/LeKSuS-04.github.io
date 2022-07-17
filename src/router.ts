import Index from './views/Index.svelte';
import Login from './views/Login.svelte';
import { wrap } from 'svelte-spa-router/wrap';
import Admin from './views/Admin.svelte';

export const routes = {
  '/': wrap({
    component: Index,
    userData: {
      routeName: 'About me'
    }
  }),
  '/login': wrap({
    component: Login,
    userData: {
      routeName: 'Admin login'
    }
  }),
  '/admin': wrap({
    component: Admin,
    userData: {
      routeName: 'Admin'
    }
  }),
};
