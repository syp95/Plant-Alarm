import {
    collection,
    DocumentData,
    getDocs,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';
import { userObjState } from '../atoms/atoms';
import { getLoginUserObj } from '../firebase/auth_service';
import { fbDb } from '../firebase/firebase';

interface IPlantData {
    data?: DocumentData;
    id: string;
    plantName?: string;
    wateringDate?: number;
    lastWateringDate?: string;
}

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
        const plants = await getDocs(q);

        plants.forEach((plant) => {
            const plantObject: IPlantData = {
                ...plant.data(),
                id: plant.id,
            };

            setPlantList((prev: IPlantData[]) => [plantObject, ...prev]);
        });
    };

    return (
        <>
            <div>List</div>
            {plantList.map((plant, idx) => {
                return (
                    <>
                        <div key={idx}>
                            <div>{plant.plantName}</div>
                            <div>{plant.wateringDate}일 마다 한번씩</div>
                            <div>{plant.lastWateringDate}</div>
                            <button>delete</button>
                            <button>update</button>
                        </div>
                    </>
                );
            })}
        </>
    );
};

export default PlantList;
