import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCT-_PplCwcLspzMK9ryM3eoWfFn02lyWg',
  authDomain: 'jacques-bf86d.firebaseapp.com',
  projectId: 'jacques-bf86d',
  storageBucket: 'jacques-bf86d.appspot.com',
  messagingSenderId: '868842523339',
  appId: '1:868842523339:web:6d51365fde8ecc443b294e',
  measurementId: 'G-M9JEX81PNQ',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
