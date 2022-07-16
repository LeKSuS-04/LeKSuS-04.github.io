import type { User } from "firebase/auth";
import { writable, type Writable } from "svelte/store";


function createUserStore() {
  const userData = localStorage.getItem('user');
  const { subscribe, set }: Writable<User> = writable(
    userData === null ? null : JSON.parse(userData)
  );

  return {
    subscribe,
    set: (user) => {
      localStorage.setItem('user', JSON.stringify(user));
      set(user);
    }
  }
}

export const user = createUserStore();
