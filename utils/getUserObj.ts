import { useMemo } from 'react';
import { fbAuth } from '../firebaseConfig';

export default function getUserObj(setUserObj: Function) {
    fbAuth.onAuthStateChanged((user) => {
        if (user) {
            setUserObj({
                email: user?.email,
                uid: user?.uid,
                displayName: user.displayName ? user.displayName : '',
            });
        }
    });
}
