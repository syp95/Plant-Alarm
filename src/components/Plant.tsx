import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { numberPickerState, pickNumberState } from '../atoms/atoms';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

import NumberPicker from './NumberPicker';
import plantDefault from 'public/plant-default-image.jpg';
import CircleButton from './CircleButton';
import { deletePlantData, IPlantDataProps, putPlantData } from 'src/apis';

const OpenPicker = styled(motion.div)`
    width: 440px;
    position: absolute;
    bottom: 0;
    @media (max-width: 440px) {
        width: 300px;
    }
`;

const Img = styled.div`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    overflow: hidden;
    border: #ebebeb solid 2px;
`;

const PlantContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border: 2px solid #ebebeb;
    border-radius: 20px;
    margin-bottom: 10px;
    padding: 10px;
    @media (max-width: 440px) {
        button {
            width: 45px;
            height: 45px;
            font-size: 12px;
            margin-bottom: 5px;
        }
    }
`;

const PlantTextContainer = styled.div`
    font-size: 14px;
    line-height: 24px;
    b {
        font-weight: 600;
    }
    @media (max-width: 440px) {
        margin-left: 10px;
        font-size: 12px;
        line-height: 20px;
    }
`;

const PlantEditContainer = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 20px;
    padding: 30px 0px 10px 0px;
    background-color: #fff;

    form {
        display: flex;
        flex-direction: row;

        align-items: center;
        h4 {
            font-size: 14px;
            position: absolute;
            margin: 0;
            margin-bottom: 10px;
            transform: translate(0px, -15px);
        }
        h3 {
            font-size: 14px;
            position: absolute;
            margin: 0;
            margin-bottom: 10px;
            transform: translate(165px, -15px);
        }
    }
    input {
        width: 40%;
        margin-right: 10px;
    }

    @media (max-width: 440px) {
        input {
            width: 37%;
        }
        form {
            h3 {
                transform: translate(115px, -15px);
            }
        }
        button {
            width: 45px;
            height: 45px;
            font-size: 12px;
        }
    }
    @media (max-width: 390px) {
        input {
            width: 35%;
        }
        form {
            h3 {
                transform: translate(100px, -15px);
            }
        }
    }
    @media (max-width: 360px) {
        form {
            h3 {
                transform: translate(90px, -15px);
            }
        }
    }
`;

interface ISubmitProps {
    name: string;
}

const Plant = ({ plantData }: IPlantDataProps) => {
    const [editing, setEditing] = useState(false);
    const [newPlantWater, setNewPlantWater] = useState(plantData.wateringDate);
    const [newPlantName, setNewPlantName] = useState(plantData.plantName);
    const [newLastWater, setNewLastWater] = useState(
        plantData.lastWateringDate,
    );
    const [numberPicker, setNumberPicker] = useRecoilState(numberPickerState);
    const [pick, setPick] = useRecoilState(pickNumberState);
    const { register, handleSubmit, formState } = useForm<ISubmitProps>();

    const onDelete = async () => {
        const ok = window.confirm('정말 지우실건가요?');
        if (ok) {
            if (plantData.id) {
                deletePlantData(plantData.id);
            }
        }
    };

    const toggleEditing = () => {
        setEditing((prev) => !prev);
        setPick(0);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = e;
        setNewPlantName(value);
    };

    const onSubmit = async (data: ISubmitProps) => {
        let wateringNumber = pick;

        if (pick === 0) {
            wateringNumber = newPlantWater ? newPlantWater : 1;
        }

        if (plantData.id) {
            putPlantData(plantData.id, {
                plantName: data.name,
                wateringDate: wateringNumber,
            });
        }

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
                    <PlantEditContainer>
                        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                            <h4>이름</h4>
                            <input
                                {...register('name')}
                                value={newPlantName}
                                onChange={onChange}
                                type='text'
                                autoComplete='off'
                                required
                            />
                            <h3>물주기</h3>
                            <input
                                autoComplete='off'
                                onClick={onNumberPicker}
                                onChange={() => pick}
                                value={pick ? pick : newPlantWater}
                                required
                            />

                            <CircleButton name='확인' width='50px' />
                        </form>
                        <div>
                            <CircleButton
                                onClick={toggleEditing}
                                width='50px'
                                name='취소'
                            />
                        </div>
                    </PlantEditContainer>
                </>
            ) : (
                <>
                    <PlantContainer>
                        <div>
                            {plantData.imageUrl ? (
                                <Img>
                                    <Image
                                        src={plantData.imageUrl}
                                        width={90}
                                        height={90}
                                    />
                                </Img>
                            ) : (
                                <Img>
                                    <Image
                                        src={plantDefault}
                                        width={90}
                                        height={90}
                                    />
                                </Img>
                            )}
                        </div>
                        <PlantTextContainer>
                            <div>
                                이름 : <b>{plantData.plantName}</b>
                            </div>
                            <div>
                                <b>{plantData.wateringDate}일</b> 마다 한번씩
                            </div>
                            <div>
                                <b>{newLastWater?.slice(0, 10)}</b> 에 물을
                                줬어요
                            </div>
                        </PlantTextContainer>
                        <div>
                            <CircleButton
                                onClick={toggleEditing}
                                width='50px'
                                name='수정'
                            ></CircleButton>
                            <span> </span>
                            <CircleButton
                                onClick={onDelete}
                                width='50px'
                                name='삭제'
                            ></CircleButton>
                        </div>
                    </PlantContainer>
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
