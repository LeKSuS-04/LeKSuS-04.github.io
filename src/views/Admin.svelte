<script lang="ts">
  import Fa from 'svelte-fa';
  import * as icons from '@fortawesome/free-brands-svg-icons';
  import { onMount, tick } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { marked } from 'marked';
  import { errors } from '../store/error';
  import { user } from '../store/user';
  import { db } from '../firebase';
  import {
    doc,
    getDoc,
    serverTimestamp,
    updateDoc,
  } from 'firebase/firestore/lite';
  import type { Link } from '../types';

  let aboutMe = '';
  let editorModeOn = false;
  let textarea: HTMLTextAreaElement | null;
  let links: Link[] = [];
  const emptyLink = {
    icon: '',
    color: '#ffffff',
    link: '',
  };

  const docRef = doc(db, 'users', 'data');

  function resizeTextarea() {
    if (textarea !== null) {
      textarea.style.height = 'auto';
      textarea.style.height = `calc(${textarea.scrollHeight}px - 0rem)`;
    }
  }

  async function changeEditorMode() {
    editorModeOn = !editorModeOn;
    if (editorModeOn) {
      await tick();
      resizeTextarea();
    } else {
      updateAboutMe();
    }
  }

  async function updateAboutMe() {
    await updateDoc(docRef, {
      aboutMe: {
        data: aboutMe,
        lastUpdated: serverTimestamp(),
      },
    });
  }

  function removeEmptyLinks(links: Link[]): Link[] {
    return links.filter(
      link =>
        link.icon !== emptyLink.icon ||
        link.color !== emptyLink.color ||
        link.link !== emptyLink.link
    );
  }

  function linksChanged() {
    links = removeEmptyLinks(links);
    links = [...links, { ...emptyLink }];
  }

  async function updateLinks() {
    await updateDoc(docRef, {
      links: removeEmptyLinks(links),
    });
  }

  onMount(async () => {
    if ($user === null || $user.uid !== 'U92FxASDTleL5y1Sp8dvKWRep0A3') {
      errors.addError('Not admin!');
      push('/login');
    }

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      errors.addError("Document doesn't exist. Check your firestore config!");
    } else {
      const data = docSnap.data();
      aboutMe = data['aboutMe']['data'];
      links = data['links'];
      linksChanged();
    }
  });
</script>

<section class="markdown">
  {#if editorModeOn}
    <textarea
      on:input={resizeTextarea}
      bind:this={textarea}
      bind:value={aboutMe}
      rows="1"
      spellcheck="false" />
  {:else}
    <article>
      {@html marked(aboutMe)}
    </article>
  {/if}

  <button on:click={changeEditorMode}>
    {editorModeOn ? 'Save' : 'Edit'}
  </button>
</section>

<section class="links">
  <div class="editor">
    <p class="label">Icon</p>
    <p class="label">Icon code</p>
    <p class="label">Color</p>
    <p class="label">Link</p>

    {#each links as { icon, color, link }}
      {#if icons[icon] === undefined}
        <span class="icon">...</span>
      {:else}
        <span class="icon"><Fa icon={icons[icon]} /></span>
      {/if}
      <input type="text" bind:value={icon} on:input={linksChanged} />
      <input type="color" bind:value={color} on:input={linksChanged} />
      <input type="url" bind:value={link} on:input={linksChanged} />
    {/each}
  </div>

  <button on:click={updateLinks}> Save </button>
</section>

<style lang="scss">
  .markdown {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    margin-bottom: 2rem;

    textarea {
      width: 100%;
      resize: vertical;

      padding: 0.4em;
      font-size: 0.8rem;

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

    article {
      text-align: left;

      & :global(a) {
        font-weight: 500;
        text-decoration: inherit;
        transition-duration: 200ms;
        color: var(--accent-color);

        &:hover {
          color: var(--accent-alt-color);
        }
      }
    }
  }

  .links {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .editor {
      display: grid;
      grid-template-columns: 1fr 3fr 1fr 6fr;
      justify-items: center;
      gap: 1rem 0.4rem;

      p.label {
        margin: 0;
      }

      .icon {
        font-size: 1.5rem;
        align-self: center;
      }

      input[type='text'],
      input[type='url'] {
        padding: 0.2rem 0.4rem;
        font-size: 1rem;
        justify-self: stretch;
      }

      input[type='color'] {
        width: 100%;
        height: 100%;
      }

      input {
        background-color: var(--background-color);
        border: 2px solid var(--border-color);
        outline: none;

        transition-duration: 300ms;
        &:hover {
          border-color: var(--accent-alt-color);
        }
        &:focus {
          border-color: var(--accent-color);
        }
      }
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

  @media screen and (max-width: 768px) {
    .links {
      grid-template-columns: 1fr;

      p.label {
        display: none;
      }

      input[type='color'] {
        height: 2rem;
      }

      input[type='url'] {
        margin-bottom: 2rem;
      }
    }
  }
</style>
