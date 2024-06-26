import NextAuth from 'next-auth';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { cert } from 'firebase-admin/app';
import GoogleProvider from 'next-auth/providers/google';
import { Adapter } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: JWT; user: any }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth({
  ...authOptions,
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID as string,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL as string,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY?.replace(
        /\\n/g,
        '\n'
      ) as string,
    }),
  }) as Adapter,
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };
