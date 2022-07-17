/* Replaces '#ABOUTME#', '#LASTUPDATED#' and '#LINKS#' in corresponding
views/components to data, fetched from firebase
*/

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore/lite';
import { readFileSync, writeFileSync } from 'fs';

function getDB() {
  const firebaseConfig = {
    apiKey: 'AIzaSyDfCire_DYhgZlJOsAn4sUzMK6GkEKo9kQ',
    authDomain: 'my-website-cf995.firebaseapp.com',
    databaseURL:
      'https://my-website-cf995-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'my-website-cf995',
    storageBucket: 'my-website-cf995.appspot.com',
    messagingSenderId: '769955482232',
    appId: '1:769955482232:web:dfeab38df92a9ddec37b8d',
    measurementId: 'G-RD0PF23BN1',
  };
  const app = initializeApp(firebaseConfig);
  return getFirestore(app);
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

async function fetchData(db) {
  const docSnap = await getDoc(doc(db, 'users', 'data'));
  if (!docSnap.exists()) {
    return {
      aboutMe: 'Failed fetching data :(',
      lastUpdated: formatDate(new Date()),
      links: [],
    };
  }

  const data = docSnap.data();
  return {
    aboutMe: data['aboutMe']['data'],
    lastUpdated: formatDate(
      new Date(data['aboutMe']['lastUpdated'].toMillis())
    ),
    links: data['links'],
  };
}

function escapeBadChars(text) {
  return text
    .replaceAll('\n', '\\n')
    .replaceAll("'", "\\'")
    .replaceAll('"', '\\"')
    .replaceAll('`', '\\`');
}

function main() {
  const indexSveltePath = './src/views/Index.svelte';
  const navigationSveltePath = './src/lib/Navigation.svelte';

  const db = getDB();
  fetchData(db).then(({ aboutMe, lastUpdated, links }) => {
    const indexSvelte = readFileSync(indexSveltePath, 'utf-8');
    writeFileSync(
      indexSveltePath,
      indexSvelte
        .replace("'#ABOUTME#'", "'" + escapeBadChars(aboutMe) + "'")
        .replace("'#LASTUPDATED#'", "'" + escapeBadChars(lastUpdated) + "'")
    );

    const navigationSvelte = readFileSync(navigationSveltePath, 'utf-8');
    writeFileSync(
      navigationSveltePath,
      navigationSvelte.replace("'#LINKS#'", JSON.stringify(links))
    );
  });
}

main();
