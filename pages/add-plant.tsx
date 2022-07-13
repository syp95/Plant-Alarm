import { addDoc, collection } from 'firebase/firestore';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
    numberPickerState,
    pickNumberState,
    userObjState,
} from '../atoms/atoms';
import NumberPicker from '../components/NumberPicker';
import Seo from '../components/Seo';
import { fbDb } from '../firebase/firebase';

import { AnimatePresence, motion, transform } from 'framer-motion';
import { getLoginUserObj } from '../firebase/auth_service';

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
    const [userObj, setUserObj] = useRecoilState(userObjState);
    useEffect(() => {
        getLoginUserObj(setUserObj, router);
    }, []);

    const { register, handleSubmit, formState } = useForm();

    const onPlantSubmit = async (submitData: ISubmitData) => {
        let imageUrl = '';

        const newPlantObj = {
            plantName: submitData.plantName,
            wateringDate: pick,
            lastWateringDate: submitData.lastWateringDate,
            createAt: Date.now(),
            creatorId: userObj.uid,
            imageUrl,
        };
        await addDoc(collection(fbDb, 'plant'), newPlantObj)
            .then((res) => {
                console.log('data gone');
                setPick(0);
                router.push('/');
            })
            .catch((err) => console.log(err));
    };

    const [numberPicker, setNumberPicker] = useRecoilState(numberPickerState);
    const [pick, setPick] = useRecoilState(pickNumberState);

    const onNumberPicker = () => {
        setNumberPicker(true);
    };

    const goToApp = () => {
        router.push('/');
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
                    placeholder='몇 일에 한번씩 물을 주나요?'
                    autoComplete='off'
                    onClick={onNumberPicker}
                    onChange={() => pick}
                    value={pick ? String(pick) : ''}></input>

                <input
                    {...register('lastWateringDate', {
                        required: '',
                    })}
                    type='date'
                    placeholder='마지막으로 물을 준 날이 언젠가요?'></input>
                <button>ADD</button>
            </form>
            <button onClick={() => goToApp()}>Cancel</button>

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
