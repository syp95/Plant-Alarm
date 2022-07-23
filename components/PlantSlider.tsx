import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IPlantDataProps } from '../atoms/atoms';
import styled from 'styled-components';

import { doc, updateDoc } from 'firebase/firestore';
import { fbDb } from '../firebase/firebase';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import plantDefault from '../public/plant-default-image.jpg';
import CircleButton from './CircleButton';

const Img = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    border: #ebebeb solid 2px;
`;

const PlantSliderContainer = styled.div`
    display: flex;
    width: 96%;
    height: 500px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    background-color: white;
    border: 2px solid #ebebeb;
    border-radius: 10px;
    @media (max-width: 430px) {
        width: 330px;
    }
    @media (max-width: 414px) {
        width: 315px;
    }
    @media (max-width: 400px) {
        width: 290px;
    }
    @media (max-width: 375px) {
        width: 275px;
    }
    @media (max-width: 360px) {
        width: 265px;
    }
`;

const ProgressContainer = styled.div`
    position: absolute;
    top: 35px;
    width: 230px;
    height: 230px;
`;

const WateringTextContainer = styled.div`
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
    line-height: 20px;
`;

const PlantNameContainer = styled.div`
    text-align: center;
    h4 {
        margin-bottom: 10px;
    }
    div {
        margin-bottom: 20px;
    }
`;

const PlantSlider = ({ plantData }: IPlantDataProps) => {
    const [waterRestDay, setWaterRestDay] = useState(0);
    const [waterRestPer, setWaterRestPer] = useState(0);
    const [newLastWater, setNewLastWater] = useState(
        plantData.lastWateringDate,
    );
    const [waterRestOneDay, setWaterRestOneDay] = useState(false);
    const [waterRestNow, setWaterRestNow] = useState(false);
    const PlantRef = doc(fbDb, 'plant', plantData.id);

    const getDateNow = () => {
        let today = new Date();
        let year = today.getFullYear();
        let month = String(today.getMonth() + 1).padStart(2, '0');
        let day = String(today.getDate()).padStart(2, '0');

        let dateNow = `${year}-${month}-${day}`;
        return dateNow;
    };

    const onWateringClick = async () => {
        let dateNow = getDateNow();

        await updateDoc(PlantRef, {
            lastWateringDate: dateNow,
        });

        setNewLastWater(dateNow);
    };

    const notifyTomorrow = () => {
        toast.success(`${plantData.plantName} 에게 물 줄 날이 하루 남았어요!`, {
            position: toast.POSITION.TOP_CENTER,
            toastId: 'success1',
        });
    };

    const notifyLastDay = () => {
        toast.success(`${plantData.plantName} 에게 물을 줘야해요!`, {
            position: toast.POSITION.TOP_CENTER,
            toastId: 'success1',
        });
    };

    const getDateDiffNow = (lastDate: string, Water: number) => {
        let dateNow = getDateNow();
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
        if (restDay === 1) {
            setWaterRestOneDay(true);
        } else if (restDay === 0) {
            setWaterRestNow(true);
        }
    };

    useEffect(() => {
        if (newLastWater === undefined || plantData.wateringDate === undefined)
            return;
        getDateDiffNow(newLastWater, plantData.wateringDate);
    }, [newLastWater]);

    return (
        <>
            <PlantSliderContainer>
                {plantData.imageUrl ? (
                    <Img>
                        <Image
                            src={plantData.imageUrl}
                            width={200}
                            height={200}
                        />
                    </Img>
                ) : (
                    <Img>
                        <Image src={plantDefault} width={200} height={200} />
                    </Img>
                )}
                <ProgressContainer>
                    <CircularProgressbar strokeWidth={2} value={waterRestPer} />
                </ProgressContainer>

                <WateringTextContainer>
                    <div>
                        {waterRestPer < 0
                            ? '목이 말라요'
                            : `물이 ${Math.round(waterRestPer)}% 남아있어요.`}
                    </div>
                    <div>{newLastWater}일에 마지막으로 물을 줬어요.</div>
                    <div>
                        {waterRestDay < 0
                            ? '물을 주세요'
                            : `물 주기 까지 ${waterRestDay} 일 남았습니다.`}
                    </div>
                </WateringTextContainer>
                <PlantNameContainer>
                    <h4>이름</h4>
                    <div>{plantData.plantName}</div>
                </PlantNameContainer>

                <CircleButton
                    onClick={onWateringClick}
                    name='물주기'
                    width='55px'
                />
                {waterRestOneDay ? (
                    <div>
                        <>{notifyTomorrow()}</>
                        <ToastContainer />
                    </div>
                ) : (
                    ''
                )}
                {waterRestNow ? (
                    <div>
                        <>{notifyLastDay()}</>
                        <ToastContainer />
                    </div>
                ) : (
                    ''
                )}
            </PlantSliderContainer>
        </>
    );
};

export default PlantSlider;
