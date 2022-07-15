<script lang="ts">
  import Fa from 'svelte-fa';
  // import {
  //   faGithub,
  //   faTelegramPlane,
  //   faTwitter,
  // } from '@fortawesome/free-brands-svg-icons';
  import * as icons from '@fortawesome/free-brands-svg-icons';
  import { marked } from 'marked';

  const info = `
Hello, I'm Alexey Tarasov. On the internet, I am better known as LeKSuS.
I don't care how you call me, as long as I can understand you and it isn't
straight disrespectful.

I am _almost_ university student. I am applying at [Software Engineering](https://en.wikipedia.org/wiki/Software_engineering)
in [NRNU MEPhI](https://eng.mephi.ru). Studies will begin in September, and for
now I'm spending my time doing little projects and learning cool new things. 

I enjoy playing [CTFs](https://ctftime.org/ctf-wtf/). Back in high school I was
part of [[SHP] ShadowLegacy](https://ctftime.org/team/146445) team. At the moment
I am not actively participating in any CTFs, but I'm looking forward to doing so.

My primary coding language is for sure Python. I also have plenty of experience
in C/C++, although I use it only to do competitive programming. Some other
languages I worked with to some degree: Go, Haskell, JavaScript/TypeScript (Vue,
Svelte), Bash, C#. You can find my coding stats at my [Wakatime](https://wakatime.com/@LeKSuS)
profile.

My beliefs are: Arch Linux, VSCode, Vim, Firefox, Docker, Git + GitHub, SCSS,
.yaml, braces on the same line, 4 spaces instead of tabs (or 2 for HTML/CSS/JS),
semicolons in JS, Svelte, TS > JS.

I spend my free time coding and playing games, mostly turn-based strategies.
`.trim();

  const links = [
    {
      icon: icons['faGithub'],
      color: '#171515',
      link: 'https://github.com',
    },
    {
      icon: icons['faTelegramPlane'],
      color: '#0088cc',
      link: 'https://github.com',
    },
    {
      icon: icons['faTwitter'],
      color: '#1da1f2',
      link: 'https://github.com',
    },
  ];

  const lastUpdated = new Date(2022, 6, 15, 0, 0, 0, 0);
  const lastUpdatedStr = lastUpdated.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
</script>

<svelte:head>
  <link rel="icon" type="image/svg+xml" href="/leksus.svg" />
  <title>LeKSuS</title>
</svelte:head>

<nav>
  <header>About me</header>

  <ul>
    {#each links as { icon, color, link }}
      <li>
        <a href={link} style:--active-color={color}><Fa {icon} /></a>
      </li>
    {/each}
  </ul>
</nav>

<main>
  <article>
    {@html marked(info)}
  </article>

  <footer>
    <p>last updated on {lastUpdatedStr}</p>
  </footer>
</main>

<style lang="scss">
  $border-width: 2px;
  $border-style: $border-width solid var(--border-color);

  nav {
    margin: 0 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    header {
      font-size: 1.3em;
      padding: 0.3em 1em;
      margin-bottom: -1 * $border-width;

      background-color: var(--background-color);
      border: $border-style;
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
        margin-bottom: -1 * $border-width;

        background-color: var(--background-color);
        border: $border-style;
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

  main {
    border: $border-style;
    box-sizing: border-box;
    padding: 1rem 2rem;
    border-radius: 0 0 1rem 1rem;

    article {
      text-align: left;

      & :global(a) {
        font-weight: 500;
        text-decoration: inherit;
        transition-duration: 200ms;
        color: #48cae4;

        &:hover {
          color: #0096c7;
        }
      }
    }

    footer {
      font-size: 0.9em;
      opacity: 0.5;
      font-style: italic;
      text-align: right;

      p {
        margin: 0;
      }
    }
  }

  @media screen and (max-width: 768px) {
    main {
      padding: 0.5rem 1rem;
    }
  }

  @media (prefers-color-scheme: light) {
    main article :global(a) {
      color: #dd2c2f;
      &:hover {
        color: #ac1c1e;
      }
    }
  }
</style>
