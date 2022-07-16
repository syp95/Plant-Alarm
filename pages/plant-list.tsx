import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';
import { IPlantData, userObjState } from '../atoms/atoms';
import Plant from '../components/Plant';
import { getLoginUserObj } from '../firebase/auth_service';
import { fbDb } from '../firebase/firebase';

const PlantList: NextPage = () => {
    const router = useRouter();
    const [userObj, setUserObj] = useRecoilState(userObjState);

    useEffect(() => {
        getLoginUserObj(setUserObj, router);
        getMyPlant();
    }, []);

    const [plantList, setPlantList] = useState<IPlantData[]>([]);

    const getMyPlant = async () => {
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
            setPlantList(plantArr);
        });
    };

    return (
        <>
            <h2>식물 리스트</h2>
            {plantList.map((plant) => {
                return <Plant key={plant.id} plantData={plant} />;
            })}
        </>
    );
};

export default PlantList;
