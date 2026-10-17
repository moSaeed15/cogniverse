import { App, cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { getFirestore } from 'firebase-admin/firestore';

// Server-only: uses the service account credentials. Never import this from a
// client component. Initialized lazily so builds don't need the secrets.
const getAdminApp = (): App =>
  getApps().length
    ? getApp()
    : initializeApp({
        credential: cert({
          projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
          clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY?.replace(
            /\\n/g,
            '\n'
          ),
        }),
        databaseURL:
          process.env.FIREBASE_DATABASE_URL ??
          'https://cogniverse-e330a-default-rtdb.firebaseio.com',
      });

export const getAdminDb = () => getDatabase(getAdminApp());
export const getAdminFirestore = () => getFirestore(getAdminApp());
