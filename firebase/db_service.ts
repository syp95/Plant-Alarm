import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import { IUserObj } from '../src/atoms/atoms';
import { fbDb } from './firebase';

// 파라미터 받을 때 타입을 모르겠어서 사용 못하는 중... 해결법 찾아보기

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
