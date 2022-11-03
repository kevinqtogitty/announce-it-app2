import { initializeApp } from 'firebase/app';

const api = {
  key: import.meta.env.VITE_API_KEY,
  auth_domain: import.meta.env.VITE_AUTH_DOMAIN,
  project_id: import.meta.env.VITE_PROJECT_ID,
  storage_bucket: import.meta.env.VITE_STORAGE_BUCKET,
  messaging_sender_id: import.meta.env.VITE_MESSAGING_SENDER_ID,
  app_id: import.meta.env.VITE_APP_ID,
};

export const firebaseApp = initializeApp({
  apiKey: api.key,
  authDomain: api.auth_domain,
  projectId: api.project_id,
  storageBucket: api.storage_bucket,
  messagingSenderId: api.messaging_sender_id,
  appId: api.app_id,
});

console.log(api.key)
