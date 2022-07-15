import { useEffect, useState } from 'react';
import Image from 'next/image';
import plantDefault from '../public/plant-default-image.jpg';
import styled from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Img = styled.div`
    width: 75px;
    height: 75px;
    border-radius: 50%;
    overflow: hidden;
`;

const PlantSliderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    background-color: white;
    border-radius: 15px;
`;

const PlantSlider = ({ plantData }: any) => {
    const [waterRestDay, setWaterRestDay] = useState(0);
    const [waterRestPer, setWaterRestPer] = useState(0);

    const getDateDiffNow = (lastDate: string, Water: string) => {
        let today = new Date();
        let year = today.getFullYear();
        let month = String(today.getMonth() + 1).padStart(2, '0');
        let day = String(today.getDate()).padStart(2, '0');

        let dateNow = `${year}-${month}-${day}`;
        const currentDate = new Date(dateNow);
        const lastWateringDate = new Date(lastDate);
        const wateringDate = Number(Water) * (1000 * 60 * 60 * 24);

        const restDay =
            (lastWateringDate.getTime() +
                wateringDate -
                currentDate.getTime()) /
            (1000 * 60 * 60 * 24);
        const restPer = (restDay / Number(Water)) * 100;

        setWaterRestDay(restDay);
        setWaterRestPer(restPer);
    };

    useEffect(() => {
        getDateDiffNow(plantData.lastWateringDate, plantData.wateringDate);
    }, []);

    return (
        <>
            <PlantSliderContainer>
                {plantData.imageUrl ? (
                    <Img>
                        <Image
                            src={plantData.imageUrl}
                            width={75}
                            height={75}
                        />
                    </Img>
                ) : (
                    <Img>
                        <Image src={plantDefault} width={75} height={75} />
                    </Img>
                )}
                <div style={{ width: 50, height: 50 }}>
                    <CircularProgressbar value={waterRestPer} />
                </div>
                <div>물이 {Math.round(waterRestPer)}% 정도 남아있어요.</div>
                <div>{waterRestDay} 일 남았습니다.</div>
                <div>{plantData.plantName}</div>
                <div>물 주기 : {plantData.wateringDate}</div>
            </PlantSliderContainer>
        </>
    );
};

export default PlantSlider;