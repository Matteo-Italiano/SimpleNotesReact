import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCiB-ZHoprtDnOwoRZ4QLpyrYTCb_4foFk",
  authDomain: "simple-notes-matteo.firebaseapp.com",
  projectId: "simple-notes-matteo",
  storageBucket: "simple-notes-matteo.firebasestorage.app",
  messagingSenderId: "478438693453",
  appId: "1:478438693453:web:3205d89597cccd3f035a04",
  measurementId: "G-78Y6LZHC2V"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);