import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence 
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};


if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error('Firebase configuration is incomplete. Please check your .env.local file.');
}


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error('Persistence setting error:', error);
  });


export { sendPasswordResetEmail };