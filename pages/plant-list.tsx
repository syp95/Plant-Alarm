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

const PlantList: NextPage = () => {
    const [userObj, setUserObj] = useRecoilState(userObjState);
    const [plantList, setPlantList] = useState<
        QueryDocumentSnapshot<DocumentData>[]
    >([]);
    const [isLoading, setisLoading] = useState(true);

    const getMyPlant = async () => {
        const q = query(
            collection(fbDb, 'plant'),
            where('creatorId', '==', userObj.uid),
            orderBy('createAt', 'desc'),
        );
        const plants = await getDocs(q);

        const result: QueryDocumentSnapshot<DocumentData>[] = [];
        plants.forEach((plant) => {
            result.push(plant);
        });

        setPlantList(result);
    };
    console.log(plantList);

    useEffect(() => {
        getUserObj(setUserObj);
        getMyPlant();
        setTimeout(() => {
            setisLoading(false);
        }, 1500);
    }, []);

    return (
        <>
            {isLoading ? (
                <div>loading</div>
            ) : (
                <>
                    <div>PlantList</div>
                    {plantList.map((plant) => {
                        return <div>{plant.data.arguments['plantName']}</div>;
                    })}
                </>
            )}
        </>
    );
};

export default PlantList;
