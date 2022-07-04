import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// const firebaseConfig = {
//     apiKey: 'AIzaSyCIFW3pTnW8turZvnWH_nuOU8jDMXlk5aQ',
//     authDomain: 'plant-alarm.firebaseapp.com',
//     projectId: 'plant-alarm',
//     storageBucket: 'plant-alarm.appspot.com',
//     messagingSenderId: '789061072199',
//     appId: '1:789061072199:web:ee3a6f66ae77e4c9310862',
//     measurementId: 'G-MVFFCELZP0',
// };

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

        // ...add more providers here
    ],
});
