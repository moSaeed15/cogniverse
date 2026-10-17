import type { NextAuthOptions } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { getAdminFirestore } from './firebaseAdmin';

export const DEMO_USER_ID = 'x8Y8rnE0EEWaxbRiNpQpDU3KUNl1';

const isEmailAllowed = async (email?: string | null): Promise<boolean> => {
  if (!email) return false;
  const snapshot = await getAdminFirestore().collection('allowedEmails').get();
  const allowed: string[] = snapshot.docs.flatMap(doc => doc.data().emails ?? []);
  return allowed.map(e => e.toLowerCase()).includes(email.toLowerCase());
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  // Skipped when credentials are absent (e.g. a local `next build`).
  adapter: process.env.AUTH_FIREBASE_PRIVATE_KEY
    ? (FirestoreAdapter(getAdminFirestore()) as Adapter)
    : undefined,
  session: {
    strategy: 'jwt',
    maxAge: 12 * 60 * 60, // 12 hours
  },
  pages: {
    signIn: '/',
    error: '/',
  },
  callbacks: {
    // Runs on the server before a session is created, so unauthorized
    // accounts never receive a token.
    async signIn({ user, profile }) {
      const emailVerified = (profile as { email_verified?: boolean })?.email_verified;
      if (emailVerified === false) return false;
      try {
        return await isEmailAllowed(user.email);
      } catch (error) {
        console.error('Failed to check allowed emails:', error);
        return false;
      }
    },
  },
};

export const getSession = () => getServerSession(authOptions);
