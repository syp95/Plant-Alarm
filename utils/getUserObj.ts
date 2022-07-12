import { useMemo } from 'react';
import { fbAuth } from '../firebaseConfig';

export default function getUserObj(setUserObj: Function) {
    fbAuth.onAuthStateChanged((user) => {
        if (user) {
            setUserObj({
                email: user?.email,
                uid: user?.uid,
                displayName: user?.displayName,
                //세션스토리지로 옮기기!
                //세션스토리지에서 불러오는 함수로 변경
            });
        }
    });
}
