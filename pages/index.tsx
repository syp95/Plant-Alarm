import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import { getLoginUserObj } from '../firebase/auth_service';
import { fbDb } from '../firebase/firebase';

import type { GetServerSideProps, NextPage } from 'next';
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

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircleButton from '../components/CircleButton';
import SunAnimation from '../components/SunAnimation';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getWeather, IWeather } from './api/getWeatherData';
import useGeolocation from '../hooks/useGeolocation';
import CloudAnimation from '../components/CloudAnimation';
import RainAnimation from '../components/RainAnimation';

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
        background: #64b058;
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

const SliderContainer = styled.div``;

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
    border-radius: 20px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
`;

const WeatherContainer = styled.div`
    position: relative;
    font-size: 12px;
    background-color: #73cc65;
    color: white;
    margin-top: 40px;
    width: 100%;
    height: 130px;
    border: 2px solid #ebebeb;
    border-radius: 20px;
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

const VerticalLine = styled.div`
    width: 3px;
    height: 50px;
    background-color: #fff;
    margin: 0px 15px;
    @media (max-width: 440px) {
        margin: 0px 15px;
    }
    @media (max-width: 390px) {
        margin: 0px 7px;
    }
`;

const SunAnimationContainer = styled.div`
    width: 200px;
    height: 200px;
    position: absolute;
    left: -20px;

    @media (max-width: 440px) {
        width: 150px;
        height: 150px;
    }
    @media (max-width: 360px) {
        left: -35px;
    }
`;
const CloudAnimationContainer = styled.div`
    width: 180px;
    height: 180px;
    position: absolute;
    top: -10px;
    left: -15px;

    @media (max-width: 440px) {
        width: 120px;
        height: 120px;
        top: 15px;
        left: 0px;
    }
    @media (max-width: 390px) {
        left: -10px;
    }
    @media (max-width: 360px) {
        width: 90px;
        height: 90px;
        top: 25px;
        left: -10px;
    }
`;

const RainAnimationContainer = styled.div`
    width: 180px;
    height: 180px;
    position: absolute;
    top: -10px;
    left: -15px;
`;

const Home: NextPage = () => {
    const router = useRouter();
    const [userObj, setUserObj] = useRecoilState(userObjState);
    const [plantList, setPlantList] = useState<IPlantData[]>([]);
    const [sliderRef, setSliderRef] = useState<any>(null);
    const [cloudy, setCloudy] = useState(false);
    const disPlayName = NameConverter(userObj.displayName);

    const { data } = useQuery<IWeather>(['weather', 'nowWeather'], getWeather, {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        keepPreviousData: true,
    });

    const tempConvert = () => {
        if (data?.main.temp === undefined) return 0;
        const temp = Math.ceil(data?.main.temp);
        return temp;
    };

    const cloudConvert = () => {
        if (data?.clouds.all === undefined) {
            console.log('cloud data undefined');
            return;
        } else if (data?.clouds.all < 50) {
            setCloudy(false);
        } else if (data?.clouds.all > 50) {
            setCloudy(true);
        }
    };

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
        cloudConvert();
        getMyPlant();
    }, [router]);

    return (
        <>
            <Seo title='메인' />
            <h2>{disPlayName}님의 식물 알람</h2>
            {/* 데이터 로딩 안됬을 때랑 데이터가 로딩 되는 걸 기다릴 때 
            아래 문장이 뜨는 걸 방지하려면..? 
            데이터를 로딩 중 일때와 데이터가 아예 없을 때도 구분되면 좋겠다. */}
            {plantList.length === 0 ? (
                <NoPlantContainer>
                    추가한 식물이 없습니다. <br />
                    식물을 추가해보세요.
                </NoPlantContainer>
            ) : (
                <SliderContainer>
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
                </SliderContainer>
            )}

            <WeatherContainer>
                {cloudy ? (
                    <>
                        <CloudAnimationContainer>
                            <CloudAnimation />
                        </CloudAnimationContainer>
                        <div>
                            <h2>오늘은 흐려요.</h2>
                            <div>햇빛이 구름에 가리는 날</div>
                        </div>
                        <VerticalLine></VerticalLine>
                    </>
                ) : (
                    <>
                        <SunAnimationContainer>
                            <SunAnimation />
                        </SunAnimationContainer>
                        <div>
                            <h2>오늘은 맑아요.</h2>
                            <div>햇빛을 주기 좋은 날</div>
                        </div>
                        <VerticalLine></VerticalLine>
                    </>
                )}

                <h2>기온 : {tempConvert()}°C</h2>
            </WeatherContainer>
            <AddBtnContainer>
                <CircleButton
                    width='55px'
                    onClick={addPlantClick}
                    name='식물 추가'
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
