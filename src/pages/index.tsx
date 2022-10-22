import { useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from 'react-query';

import PlantSlider from '../components/Home/PlantSlider/PlantSlider';
import CircleButton from '../components/Shared/CircleButton';
import Seo from '../components/Shared/Seo/Seo';
import Weather from '../components/Home/WeatherComponents/Weather';

import { parseNameLength } from '../../utils/parseNameLength';

import { getWeather, IWeather } from '../apis/getWeatherData';
import { getPlantData, IPlantData } from 'src/apis/plant';
import { getUserData, IUserObj } from 'src/apis/auth';
import {
    AddBtnContainer,
    NoPlantContainer,
    SliderContainer,
    SliderMoveBtnContainer,
    StyledSlider,
    StyledToastContainer,
    WeatherContainer,
} from 'styles/homestyles';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const Home: NextPage = () => {
    const router = useRouter();
    const { data: userObj } = useQuery<IUserObj>(
        ['plantUser', 'userData'],
        getUserData,
    );
    const { data: plantList } = useQuery<IPlantData[]>(
        ['plantList', 'plant'],
        getPlantData,
    );
    const { data } = useQuery<IWeather>(['weather', 'nowWeather'], getWeather, {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        keepPreviousData: true,
    });

    const [sliderRef, setSliderRef] = useState<any>(null);

    const disPlayName = parseNameLength(userObj?.username);

    const addPlantClick = () => {
        router.push('/add-plant');
    };

    return (
        <>
            <Seo title='메인' />
            <h2>{disPlayName}님의 식물 알람</h2>

            {plantList?.length === 0 ? (
                <NoPlantContainer>
                    추가한 식물이 없습니다. <br />
                    식물을 추가해보세요.
                </NoPlantContainer>
            ) : (
                <SliderContainer>
                    <StyledSlider ref={setSliderRef} {...settings}>
                        {plantList?.map((plant) => {
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
