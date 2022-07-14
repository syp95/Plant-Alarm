import { useEffect, useState } from 'react';

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
            <div>{plantData.plantName}</div>
            <div>물 주기 : {plantData.wateringDate}</div>
            <div>{waterRestDay} 일 남았습니다.</div>
            <div>물이 {Math.round(waterRestPer)}% 정도 남아있어요.</div>
        </>
    );
};

export default PlantSlider;
