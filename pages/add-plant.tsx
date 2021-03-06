import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import {
    numberPickerState,
    pickNumberState,
    userObjState,
} from '../atoms/atoms';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

import { fbDb, fbStorage } from '../firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getLoginUserObj } from '../firebase/auth_service';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

import { v4 as uuidv4 } from 'uuid';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import Seo from '../components/Seo';
import Button from '../components/Button';
import CircleButton from '../components/CircleButton';
import NumberPicker from '../components/NumberPicker';

const OpenPicker = styled(motion.div)`
    width: 440px;
    position: absolute;
    bottom: 0;

    @media (max-width: 440px) {
        width: 300px;
    }
`;

const AddPlantContainer = styled.div`
    b {
        font-size: 12px;
        font-weight: 500;
        color: #9d9d9d;
    }
    img {
        border-radius: 50%;
        border: solid 2px #ebebeb;
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
    input {
        margin-bottom: 30px;
    }
    div {
        font-size: 14px;
    }
    label {
        display: block;
        font-size: 13px;
        text-align: center;
        padding: 10px;
        margin: 10px 0px 30px;
        background-color: #64b058;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        :hover {
            background-color: #59994f;
        }
        :active {
            background-color: #4c8144;
        }
    }
`;

const ImagePickerContainer = styled.div`
    button {
        margin-left: 20px;
    }
`;

const BackBtnContainer = styled.div`
    position: absolute;

    bottom: 6%;
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

    const { register, handleSubmit, formState, setFocus } =
        useForm<ISubmitData>();
    const [image, setImage] = useState('');

    const [numberPicker, setNumberPicker] = useRecoilState(numberPickerState);
    const [pick, setPick] = useRecoilState(pickNumberState);

    const onPlantSubmit = async (submitData: ISubmitData) => {
        if (formState.isSubmitting) return;
        let imageUrl = '';
        if (image !== '') {
            const fileRef = ref(fbStorage, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(fileRef, image, 'data_url');
            imageUrl = await getDownloadURL(response.ref);
        }

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

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { files },
        } = e;
        if (!files || files.length === 0) return;
        const theFile = files[0];
        const render = new FileReader();
        render.onloadend = (finish: any) => {
            setImage(finish.currentTarget.result);
        };
        render.readAsDataURL(theFile);
    };
    const onImageClear = () => {
        setImage('');
    };

    const onNumberPicker = () => {
        setNumberPicker(true);
    };

    const goToApp = () => {
        router.push('/');
    };

    useEffect(() => {
        getLoginUserObj(setUserObj, router);
        setFocus('plantName');
    }, []);

    useEffect(() => {
        if (formState.isSubmitting) {
            NProgress.start();
        } else {
            NProgress.done();
        }
    }, [formState.isSubmitting]);

    return (
        <>
            <Seo title='추가' />
            <h2>내 식물을 추가해보세요.</h2>
            <AddPlantContainer>
                <form
                    onSubmit={handleSubmit((data) => {
                        onPlantSubmit(data);
                    })}
                >
                    {image && (
                        <ImagePickerContainer>
                            <div>미리보기</div>
                            <img style={{ width: '100px' }} src={image} />
                            <CircleButton
                                onClick={onImageClear}
                                name='취소'
                                width='50px'
                            />
                        </ImagePickerContainer>
                    )}
                    <div>
                        사진을 선택해주세요. <br />
                        <b>(업로드하지 않으면 기본 이미지가 등록됩니다.)</b>
                    </div>
                    <label htmlFor='input-file'>업로드</label>
                    <input
                        style={{ display: 'none' }}
                        id='input-file'
                        type='file'
                        accept='image/*'
                        autoComplete='off'
                        onChange={onFileChange}
                    />
                    <div>이름이 무엇인가요?</div>
                    <input
                        {...register('plantName', {
                            required: '식물 이름을 입력하세요.',
                        })}
                        autoComplete='off'
                        placeholder='이름이 무엇인가요?'
                    />
                    <div>물 주기를 선택해주세요.</div>
                    <input
                        autoComplete='off'
                        placeholder='몇 일에 한번씩 물을 주나요?'
                        onClick={onNumberPicker}
                        onChange={() => pick}
                        value={pick ? String(pick) : ''}
                    />
                    <div>마지막으로 물을 준 날을 선택해주세요.</div>
                    <input
                        {...register('lastWateringDate', {
                            required: '',
                            validate: (value) =>
                                new Date(value).getTime() <
                                new Date().getTime(),
                        })}
                        type='date'
                        autoComplete='off'
                        placeholder='마지막으로 물을 준 날이 언젠가요?'
                    />

                    <Button width='100%' name='추가하기' />
                </form>
            </AddPlantContainer>
            <BackBtnContainer>
                <CircleButton
                    onClick={() => goToApp()}
                    name='뒤로'
                    width='55px'
                />
            </BackBtnContainer>

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

export default AddPlant;
