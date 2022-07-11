import { addDoc, collection } from 'firebase/firestore';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import {
    numberPickerState,
    pickNumberState,
    userObjState,
} from '../atoms/atoms';
import NumberPicker from '../components/NumberPicker';
import Seo from '../components/Seo';
import { fbDb } from '../firebaseConfig';
import getUserObj from '../utils/getUserObj';
import { AnimatePresence, motion, transform } from 'framer-motion';

const OpenPicker = styled(motion.div)`
    width: 520px;
    position: absolute;
    bottom: 0;
`;

interface ISubmitData {
    plantName: string;
    wateringDate: string;
    lastWateringDate: string;
    FieldValues: any;
}

const AddPlant: NextPage = () => {
    const router = useRouter();
    const addPlantClick = () => {
        router.push('/');
    };
    const [userObj, setUserObj] = useRecoilState(userObjState);
    useEffect(() => {
        getUserObj(setUserObj);
    }, []);

    const { register, handleSubmit, formState } = useForm();

    const onPlantSubmit = async (submitData: ISubmitData) => {
        let imageUrl = '';

        const newPlantObj = {
            plantName: submitData.plantName,
            wateringDate: submitData.wateringDate,
            lastWateringDate: submitData.lastWateringDate,
            createAt: Date.now(),
            creatorId: userObj.uid,
            imageUrl,
        };
        await addDoc(collection(fbDb, 'plant'), newPlantObj)
            .then((res) => {
                console.log('data gone');
                router.push('/');
            })
            .catch((err) => console.log(err));
    };
    const [numberPicker, setNumberPicker] = useRecoilState(numberPickerState);
    const pickNumber = useRecoilValue(pickNumberState);
    const onNumberPicker = () => {
        setNumberPicker(true);
    };
    return (
        <>
            <Seo title='ADD' />
            <form
                onSubmit={handleSubmit((data: any) => {
                    onPlantSubmit(data);
                })}>
                <input
                    {...register('plantName', {
                        required: '식물 이름을 입력하세요.',
                    })}
                    placeholder='이름이 무엇인가요?'></input>
                <input
                    {...register('wateringDate', {
                        required: '',
                    })}
                    placeholder='몇 일에 한번씩 물을 주나요?'
                    autoComplete='off'
                    onClick={onNumberPicker}
                    value={pickNumber ? pickNumber : ''}></input>

                <input
                    {...register('lastWateringDate', {
                        required: '',
                    })}
                    type='date'
                    placeholder='마지막으로 물을 준 날이 언젠가요?'></input>
                <button>ADD</button>
            </form>

            <AnimatePresence>
                {numberPicker && (
                    <OpenPicker
                        initial={{ transform: 'translateY(300px)' }}
                        animate={{ transform: 'translateY(000px)' }}
                        exit={{ transform: 'translateY(300px)' }}
                        transition={{ type: 'tween', duration: 0.7 }}>
                        <NumberPicker />
                    </OpenPicker>
                )}
            </AnimatePresence>
        </>
    );
};

export default AddPlant;
