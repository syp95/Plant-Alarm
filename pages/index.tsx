import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import { getLoginUserObj } from '../firebase/auth_service';
import { fbDb } from '../firebase/firebase';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { IPlantData, userObjState } from '../atoms/atoms';

import PlantSlider from '../components/PlantSlider';
import Seo from '../components/Seo';
import { NameConverter } from '../utils/nameConverter';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StyledSlider = styled(Slider)`
    .slick-list {
        width: 1600px;
        margin: 0 auto;
    }
    .slick-slide div {
    }
    .slicks-dots {
        bottom: -50px;
        margin-top: 200px;
    }
    .slick-track {
        overflow-x: hidden;
    }
`;

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
};

const Home: NextPage = () => {
    const router = useRouter();
    const [userObj, setUserObj] = useRecoilState(userObjState);
    const [plantList, setPlantList] = useState<IPlantData[]>([]);

    const disPlayName = NameConverter(userObj.displayName);

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

    const addPlantClick = () => {
        router.push('/add-plant');
    };

    useEffect(() => {
        getLoginUserObj(setUserObj, router);
        getMyPlant();
    }, [router]);

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
