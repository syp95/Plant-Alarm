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
import { userObjState } from '../atoms/atoms';
import PlantSlider from '../components/PlantSlider';

import Seo from '../components/Seo';
import { getLoginUserObj } from '../firebase/auth_service';
import { fbDb } from '../firebase/firebase';
import { NameConverter } from '../utils/nameConverter';
import { IPlantData } from './plant-list';

const Home: NextPage = () => {
    const router = useRouter();
    const [userObj, setUserObj] = useRecoilState(userObjState);
    const addPlantClick = () => {
        router.push('/add-plant');
    };

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

    useEffect(() => {
        getLoginUserObj(setUserObj, router);
        getMyPlant();
    }, []);

    const disPlayName = NameConverter(userObj.displayName);
    return (
        <>
            <Seo title='Home' />
            <h2>{disPlayName}님의 식물 알람</h2>

            {plantList.map((plant) => {
                return <PlantSlider key={plant.id} plantData={plant} />;
            })}

            <button onClick={addPlantClick}>ADD</button>
        </>
    );
};

export default Home;
