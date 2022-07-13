import { initializeApp } from 'firebase/app';
import {
    FacebookAuthProvider,
    getAuth,
    GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyCIFW3pTnW8turZvnWH_nuOU8jDMXlk5aQ',
    authDomain: 'plant-alarm.firebaseapp.com',
    projectId: 'plant-alarm',
    storageBucket: 'plant-alarm.appspot.com',
    messagingSenderId: '789061072199',
    appId: '1:789061072199:web:ee3a6f66ae77e4c9310862',
    measurementId: 'G-MVFFCELZP0',
};

const fbApp = initializeApp(firebaseConfig);
const fbAuth = getAuth();
const fbStorage = getStorage();
const fbDb = getFirestore();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { fbApp, fbAuth, fbStorage, fbDb, googleProvider, facebookProvider };
