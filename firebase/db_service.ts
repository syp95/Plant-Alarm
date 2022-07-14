import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import { IUserObj } from '../atoms/atoms';
import { fbDb } from './firebase';

const getMyPlant = async (userObj: IUserObj) => {
    const q = query(
        collection(fbDb, 'plant'),
        where('creatorId', '==', userObj.uid),
        orderBy('createAt', 'desc'),
    );
    await onSnapshot(q, (snapshot) => {
        const plantArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return plantArr;
    });
};

export { getMyPlant };
