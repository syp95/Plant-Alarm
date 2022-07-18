import { useEffect, useState } from 'react';
import Image from 'next/image';
import plantDefault from '../public/plant-default-image.jpg';
import styled, { css } from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { doc, updateDoc } from 'firebase/firestore';
import { fbDb } from '../firebase/firebase';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Img = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    border: #ebebeb solid 1px;
`;

const PlantSliderContainer = styled.div`
    display: flex;
    width: 400px;
    height: 500px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    background-color: white;
    border: 1px solid #ebebeb;
    border-radius: 15px;
`;

const StyledToastContainer = styled(ToastContainer)`
    top: 40px;

    .Toastify__toast {
        cursor: inherit;
        color: #fff;
        background: #64b058;
        font-family: Pretendard;
        /* background: rgba(255, 255, 255, 1); */
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

const PlantSlider = ({ plantData }: any) => {
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
        });
    };

    const notifyLastDay = () => {
        toast.success(`${plantData.plantName} 에게 물을 줘야해요!`, {
            position: toast.POSITION.TOP_CENTER,
        });
    };

    const getDateDiffNow = (lastDate: string, Water: string) => {
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
        getDateDiffNow(newLastWater, plantData.wateringDate);
    }, [newLastWater]);

    return (
        <>
            <PlantSliderContainer>
                {plantData.imageUrl ? (
                    <Img>
                        <Image
                            src={plantData.imageUrl}
                            width={100}
                            height={100}
                        />
                    </Img>
                ) : (
                    <Img>
                        <Image src={plantDefault} width={100} height={100} />
                    </Img>
                )}
                <div style={{ width: 50, height: 50 }}>
                    <CircularProgressbar value={waterRestPer} />
                </div>
                <div>
                    {waterRestPer < 0
                        ? '목이 말라요'
                        : `물이 ${Math.round(waterRestPer)}% 정도 남아있어요.`}
                </div>
                <div>
                    {waterRestDay < 0
                        ? '물을 주세요'
                        : `${waterRestDay} 일 남았습니다.`}
                </div>
                <div>{plantData.plantName}</div>
                <div>{newLastWater}</div>
                {waterRestOneDay ? (
                    <div>
                        <>{notifyTomorrow()}</>
                        <StyledToastContainer />
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
                <button onClick={onWateringClick}>물 주기</button>
            </PlantSliderContainer>
        </>
    );
};

export default PlantSlider;
