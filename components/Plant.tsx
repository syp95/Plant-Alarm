import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { numberPickerState, pickNumberState } from '../atoms/atoms';
import { fbDb } from '../firebase/firebase';
import NumberPicker from './NumberPicker';
import Image from 'next/image';
import plantDefault from '../public/plant-default-image.jpg';

const OpenPicker = styled(motion.div)`
    width: 520px;
    position: absolute;
    bottom: 0;
`;

const Img = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    border: #ebebeb solid 1px;
`;

const Plant = ({ plantData }: any) => {
    const [editing, setEditing] = useState(false);
    const [newPlantWater, setNewPlantWater] = useState(plantData.wateringDate);
    const [newPlantName, setNewPlantName] = useState(plantData.plantName);
    const [numberPicker, setNumberPicker] = useRecoilState(numberPickerState);
    const [pick, setPick] = useRecoilState(pickNumberState);
    const { register, handleSubmit, formState } = useForm();
    const PlantRef = doc(fbDb, 'plant', plantData.id);

    const onDelete = async () => {
        const ok = window.confirm('정말 지우실건가요?');
        if (ok) {
            console.log(plantData.id);
            await deleteDoc(PlantRef);
        }
    };

    const toggleEditing = () => {
        setEditing((prev) => !prev);
        setPick(0);
    };

    const onChange = (e: any) => {
        const {
            target: { value },
        } = e;
        setNewPlantName(value);
    };

    const onSubmit = async (data: any) => {
        let wateringNumber = pick;
        if (pick === 0) {
            wateringNumber = newPlantWater;
        }

        await updateDoc(PlantRef, {
            wateringDate: wateringNumber,
            plantName: data.name,
        });

        toggleEditing();
        setNewPlantWater(pick);
        setPick(0);
    };

    const onNumberPicker = () => {
        setNumberPicker(true);
    };

    return (
        <>
            {editing ? (
                <>
                    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                        <span>물 주기</span>
                        <input
                            {...register('name')}
                            value={newPlantName}
                            onChange={onChange}
                            type='text'
                            autoComplete='off'
                            required
                        />
                        <input
                            autoComplete='off'
                            onClick={onNumberPicker}
                            onChange={() => pick}
                            value={pick ? pick : newPlantWater}
                            type='text'
                            required
                        />
                        <button>확인</button>
                    </form>
                    <button onClick={toggleEditing}>취소</button>
                </>
            ) : (
                <>
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
                            <Image
                                src={plantDefault}
                                width={100}
                                height={100}
                            />
                        </Img>
                    )}

                    <div>{plantData.plantName}</div>
                    <div>{plantData.wateringDate}일 마다 한번씩</div>
                    <div>{plantData.lastWateringDate}에 물을 줬어요</div>
                    <button onClick={onDelete}>delete</button>
                    <button onClick={toggleEditing}>update</button>
                </>
            )}
            <AnimatePresence>
                {numberPicker && (
                    <OpenPicker
                        initial={{ transform: 'translateY(300px)' }}
                        animate={{ transform: 'translateY(000px)' }}
                        exit={{ transform: 'translateY(300px)' }}
                        transition={{ type: 'tween', duration: 0.7 }}
                    >
                        <NumberPicker />
                    </OpenPicker>
                )}
            </AnimatePresence>
        </>
    );
};

export default Plant;
