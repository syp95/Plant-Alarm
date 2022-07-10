import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
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

export const fbApp = initializeApp(firebaseConfig);
export const fbAuth = getAuth();
export const fbStorage = getStorage();
export const fbDb = getFirestore();
