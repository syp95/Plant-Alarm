import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { IPlantData, userObjState } from '../atoms/atoms';
import styled from 'styled-components';

import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import { getLoginUserObj } from '../firebase/auth_service';
import { fbDb } from '../firebase/firebase';

import Plant from '../components/Plant';
import Seo from '../components/Seo';

const ListTitle = styled.h2`
    margin-left: 5px;
`;

const NoPlantContainer = styled.div`
    background-color: white;
    margin-top: 40px;
    width: 100%;
    height: 120px;
    border: 2px solid #ebebeb;
    border-radius: 20px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
`;

const PlantList: NextPage = () => {
    const router = useRouter();
    const [userObj, setUserObj] = useRecoilState(userObjState);
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

    return (
        <>
            <Seo title='리스트' />
            <ListTitle>식물 리스트</ListTitle>
            {plantList.length === 0 ? (
                <NoPlantContainer>
                    추가한 식물이 없습니다. <br />
                    식물을 추가해보세요.
                </NoPlantContainer>
            ) : (
                ''
            )}
            {plantList.map((plant) => {
                return <Plant key={plant.id} plantData={plant} />;
            })}
        </>
    );
};

export default PlantList;
