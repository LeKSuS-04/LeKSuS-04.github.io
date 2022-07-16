<script lang="ts">
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '../firebase';
  import { push } from 'svelte-spa-router';
  import { errors } from '../store/error';

  let email = '';
  let password = '';

  function handleSubmit() {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        auth.updateCurrentUser(userCredentials.user);
        push('/admin');
      })
      .catch(_ => errors.addError('Nope!', 1500));
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label for="email">Email</label>
  <input type="email" id="email" bind:value={email} />

  <label for="username">Password</label>
  <input type="password" id="password" bind:value={password} />

  <button>Hack in</button>
</form>

<style lang="scss">
  form {
    width: 100%;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    label {
      font-size: 1.15rem;
      margin-bottom: 0.2em;
    }

    input {
      text-align: center;
      margin-bottom: 1em;

      padding: 0.2em;
      font-size: 1rem;

      outline: none;
      border: 2px solid var(--border-color);
      border-radius: 0.4em;
      background-color: var(--background-color);

      transition-duration: 300ms;
      &:hover {
        border-color: var(--accent-alt-color);
      }
      &:focus {
        border-color: var(--accent-color);
      }
    }

    button {
      padding: 0.3em 1.5em;
      font-size: 1rem;

      border: none;
      outline: none;
      border-radius: 0.4em;

      color: var(--background-color);
      background-color: var(--accent-color);

      transition-duration: 300ms;
      &:hover {
        cursor: pointer;
        background-color: var(--accent-alt-color);
      }
    }
  }
</style>
