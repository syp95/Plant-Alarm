import {
    collection,
    DocumentData,
    getDocs,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import { fbDb } from '../../firebaseConfig';

interface IUserObj {
    email: string;
    uid: string;
    displayName: string;
}

export const getMyPlant = async (userObj: IUserObj) => {
    const q = query(
        collection(fbDb, 'plant'),
        where('creatorId', '==', userObj.uid),
        orderBy('createAt', 'desc'),
    );
    const plants = await getDocs(q);

    return plants;
};
