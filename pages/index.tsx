import { useEffect, useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getWeather, IWeather } from './api/getWeatherData';
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

import PlantSlider from '../components/PlantSlider';
import CircleButton from '../components/CircleButton';
import Seo from '../components/Seo';
import Weather from '../components/Weather';

import { NameConverter } from '../utils/nameConverter';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeTitle = styled.h2`
    margin-left: 15px;
`;

const StyledSlider = styled(Slider)`
    .slick-list {
        width: 440px;
        margin: 0;
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
};

const StyledToastContainer = styled(ToastContainer)`
    top: 40px;

    .Toastify__toast {
        color: #fff;
        background: #4c8144;
        font-family: Pretendard;
        box-shadow: none;
        min-height: 10px;
    }
    .Toastify__toast-body {
        padding: 0;
        margin: 0;
    }
    .Toastify__toast-icon svg {
        fill: #ffffff;
    }
    .Toastify__close-button > svg {
        fill: #ebebeb;
    }
`;

const AddBtnContainer = styled.div`
    position: absolute;

    bottom: 6%;
`;

const SliderMoveBtnContainer = styled.div`
    transform: translateY(-290px);
    button {
        position: absolute;
        width: 3px;
        height: 100px;
        border: none;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.2);

        cursor: pointer;
    }
    button:hover {
        background-color: rgba(0, 0, 0, 0.4);
    }
    button:first-child {
        left: -10px;
    }
    button:last-child {
        right: -10px;
    }
`;
const NoPlantContainer = styled.div`
    background-color: white;
    margin-top: 40px;
    width: 100%;
    height: 300px;
    border: 2px solid #ebebeb;
    border-radius: 10px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
`;

const WeatherContainer = styled.div`
    position: relative;
    font-size: 12px;
    background-color: #fff;
    color: #000;
    margin-top: 40px;
    margin-left: 10px;
    width: 422px;
    height: 130px;
    border: 2px solid #ebebeb;
    border-radius: 10px;
    display: flex;
    justify-content: right;
    align-items: center;
    overflow: hidden;
    h2 {
        margin-top: 0;
        margin-bottom: 0;
    }
    h2:last-child {
        margin-right: 15px;
    }
    @media (max-width: 440px) {
        font-size: 10px;
    }
`;

const Home: NextPage = () => {
    const router = useRouter();
    const [userObj, setUserObj] = useRecoilState(userObjState);
    const [plantList, setPlantList] = useState<IPlantData[]>([]);
    const [sliderRef, setSliderRef] = useState<any>(null);

    const disPlayName = NameConverter(userObj.displayName);

    const { data } = useQuery<IWeather>(['weather', 'nowWeather'], getWeather, {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        keepPreviousData: true,
    });

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
            <Seo title='메인' />
            <HomeTitle>{disPlayName}님의 식물 알람</HomeTitle>
            {/* 데이터 로딩 안됬을 때랑 데이터가 로딩 되는 걸 기다릴 때 
            아래 문장이 뜨는 걸 방지하려면..? 
            데이터를 로딩 중 일때와 데이터가 아예 없을 때도 구분되면 좋겠다. */}
            {plantList.length === 0 ? (
                <NoPlantContainer>
                    추가한 식물이 없습니다. <br />
                    식물을 추가해보세요.
                </NoPlantContainer>
            ) : (
                <>
                    <StyledSlider ref={setSliderRef} {...settings}>
                        {plantList.map((plant) => {
                            return (
                                <PlantSlider key={plant.id} plantData={plant} />
                            );
                        })}
                    </StyledSlider>
                    <SliderMoveBtnContainer>
                        <button onClick={sliderRef?.slickPrev}></button>
                        <button onClick={sliderRef?.slickNext}></button>
                    </SliderMoveBtnContainer>
                </>
            )}

            <WeatherContainer>
                <Weather weatherData={data} />
            </WeatherContainer>
            <AddBtnContainer>
                <CircleButton
                    width='55px'
                    onClick={addPlantClick}
                    name='추가'
                />
            </AddBtnContainer>
            <StyledToastContainer />
        </>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(
        ['weather', 'nowWeather'],
        async () => await getWeather(),
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
