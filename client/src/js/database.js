import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ jate: content });
  const result = await request;
  return result;
};



// Gets all the content from the database
export const getAllDb = async () => {
  // Creates a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);
  // Creates a new transaction and specifies the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');
  // Opens up the desired object store.
  const store = tx.objectStore('jate');
  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();
  const result = await request;
  return result;
};

initdb();
