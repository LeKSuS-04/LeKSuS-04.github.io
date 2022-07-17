<script lang="ts">
  import { marked } from 'marked';

  let aboutMe = '#ABOUTME#';
  let lastUpdated = '#LASTUPDATED#';
</script>

<article>
  {@html marked(aboutMe)}
</article>

<footer>
  <p>last updated on {lastUpdated}</p>
</footer>

<style lang="scss">
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

  footer {
    font-size: 0.9em;
    opacity: 0.5;
    font-style: italic;
    text-align: right;

    p {
      margin: 0;
    }
  }
</style>
