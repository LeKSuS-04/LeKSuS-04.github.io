<script lang="ts">
  import { doc, getDoc } from 'firebase/firestore/lite';
  import { marked } from 'marked';
  import { db } from '../firebase';
  import { errors } from '../store/error';

  function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  async function fetchData(): Promise<{
    aboutMe: string;
    lastUpdated: string;
  }> {
    const docSnap = await getDoc(doc(db, 'users', 'data'));
    if (!docSnap.exists()) {
      errors.addError('Unable to fetch data :(');
      return {
        aboutMe: 'error',
        lastUpdated: formatDate(new Date()),
      };
    }

    const data = docSnap.data();
    return {
      aboutMe: data['aboutMe']['data'],
      lastUpdated: formatDate(
        new Date(data['aboutMe']['lastUpdated'].toMillis())
      ),
    };
  }
</script>

{#await fetchData()}
  <p>Fetching data...</p>
{:then { aboutMe, lastUpdated }}
  <article>
    {@html marked(aboutMe)}
  </article>

  <footer>
    <p>last updated on {lastUpdated}</p>
  </footer>
{/await}

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
