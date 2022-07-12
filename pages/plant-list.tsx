import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userObjState } from '../atoms/atoms';
import { fbDb } from '../firebaseConfig';
import getUserObj from '../utils/getUserObj';

const PlantList: NextPage = () => {
    const [userObj, setUserObj] = useRecoilState(userObjState);
    const getMyPlant = async () => {
        const q = query(
            collection(fbDb, 'plant'),
            where('creatorId', '==', userObj.uid),
        );
        const plants = await getDocs(q);
        plants.forEach((plant) => console.log(plant.data()));
    };

    useEffect(() => {
        getUserObj(setUserObj);
        getMyPlant();
    }, []);

    return (
        <>
            <div>PlantList</div>
        </>
    );
};

export default PlantList;
