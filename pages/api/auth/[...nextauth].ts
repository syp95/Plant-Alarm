import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { fbAuth } from '../../../firebase/firebaseConfig';

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }), // ...add more providers here
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            try {
                const googleCredential = GoogleAuthProvider.credential(
                    account?.id_token,
                );
                const userCredential = await signInWithCredential(
                    fbAuth,
                    googleCredential,
                ).catch((e) => {
                    console.log(e);
                    return false;
                });
                console.log('login', account);
                return userCredential ? true : false;
            } catch (e) {
                console.log(e);
                return false;
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});
