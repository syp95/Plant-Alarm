import {
    collection,
    DocumentData,
    getDoc,
    getDocs,
    orderBy,
    query,
    QueryDocumentSnapshot,
    where,
} from 'firebase/firestore';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';
import { userObjState } from '../atoms/atoms';
import { fbDb } from '../firebaseConfig';
import getUserObj from '../utils/getUserObj';

interface IPlantData {
    data?: DocumentData;
    id: string;
}

const PlantList: NextPage = () => {
    const [userObj, setUserObj] = useRecoilState(userObjState);
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
            console.log(plant.id, '>', plant.data());

            setPlantList((prev: IPlantData[]) => [plantObject, ...prev]);
        });
    };

    console.log(plantList);

    useEffect(() => {
        getUserObj(setUserObj);
        getMyPlant();
    }, []);

    return (
        <>
            <div>List</div>
            {plantList.map((plant, idx) => {
                return (
                    <>
                        <div key={idx}>
                            <div>{plant.plantName}</div>
                            <div>{plant.wateringDate}</div>
                        </div>
                    </>
                );
            })}
        </>
    );
};

export default PlantList;
