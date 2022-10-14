import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IWeatherProps } from '../apis/getWeatherData';
import CloudAnimation from './CloudAnimation';
import SunAnimation from './SunAnimation';

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

export default function Weather({ weatherData }: IWeatherProps) {
    const [cloudy, setCloudy] = useState(false);

    const tempConvert = () => {
        if (weatherData?.main.temp === undefined) return 0;
        const temp = Math.ceil(weatherData?.main.temp);
        return temp;
    };

    const cloudConvert = () => {
        if (weatherData?.clouds.all === undefined) {
            console.log('cloud data undefined');
            return;
        } else if (weatherData?.clouds.all < 50) {
            setCloudy(false);
        } else if (weatherData?.clouds.all > 50) {
            setCloudy(true);
        }
    };

    useEffect(() => {
        cloudConvert();
    }, []);

    return (
        <>
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
            <h2>기온 : {tempConvert()}°C</h2>;
        </>
    );
}
