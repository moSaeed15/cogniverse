import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBvZrZP-Ogbm1k8ZtlSaAPoi9JXSgqQYAk',
  authDomain: 'cogniverse-e330a.firebaseapp.com',
  databaseURL: 'https://cogniverse-e330a-default-rtdb.firebaseio.com',
  projectId: 'cogniverse-e330a',
  storageBucket: 'cogniverse-e330a.appspot.com',
  messagingSenderId: '511632158607',
  appId: '1:511632158607:web:7d5e36c4ae9980662fa5fa',
  measurementId: 'G-8Q1KFLV4HY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
