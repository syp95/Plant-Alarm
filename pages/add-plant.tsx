import { addDoc, collection } from 'firebase/firestore';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import { numberPickerState, userObjState } from '../atoms/atoms';
import NumberPicker from '../components/NumberPicker';
import { fbDb } from '../firebaseConfig';
import getUserObj from '../utils/getUserObj';

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

    const onPlantSubmit = async () => {
        let imageUrl = '';

        const newPlantObj = {
            // plantName: ,
            // wateringDate: ,
            // lastWateringDate:,
            createAt: Date.now(),
            creatorId: userObj.uid,
            imageUrl,
        };
        await addDoc(collection(fbDb, 'plant'), newPlantObj);
    };
    const [numberPicker, setNumberPicker] = useRecoilState(numberPickerState);
    const onNumberPicker = () => {
        setNumberPicker(true);
    };
    return (
        <>
            <form>
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
                    onClick={onNumberPicker}></input>

                <input
                    {...register('LastWateringDate', {
                        required: '',
                    })}
                    type='date'
                    placeholder='마지막으로 물을 준 날이 언젠가요?'></input>
            </form>

            <button onClick={addPlantClick}>ADD</button>
            {numberPicker && <NumberPicker />}
        </>
    );
};

export default AddPlant;
