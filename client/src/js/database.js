import req from 'express/lib/request';
import res from 'express/lib/response';
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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const noteDB = await openDB('contact', 1);
  const tx = noteDB.transaction('contact', 'readwrite');
  const store = tx.objectStore('contact');
  const request = store.put({
    id: 1,
    value: content,
  });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb not implemented');
  const noteDB = await openDB('contact', 1);
  const tx = noteDB.transaction('contact', 'readonly');
  const store = tx.objectStore('contact');
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
