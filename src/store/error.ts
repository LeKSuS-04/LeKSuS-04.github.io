import { writable, type Writable } from "svelte/store";

function createErrorStore(defaultTimeout: number) {
  const { subscribe, update }: Writable<{ id: number, msg: string }[]> = writable([]);
  let id = 0;

  return {
    subscribe,
    addError: (error: string, timeout: number = defaultTimeout) => {
      let thisId = ++id;

      update(errors => {
        errors.push({ id: id, msg: error });
        return errors;
      })

      setTimeout(() => {
        update(errors => {
          errors = errors.filter(err => err.id !== thisId);
          return errors;
        })
      }, timeout);
    }
  };
}

export const errors = createErrorStore(3000);
