import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { numberPickerState } from '../atoms/atoms';

const Submit = styled.button`
    font-size: 20px;
    position: absolute;
    background-color: transparent;
    border: none;
    color: darkblue;
    right: 2px;
    top: 2px;
`;
const Cancel = styled.button`
    font-size: 20px;
    position: absolute;
    background-color: transparent;
    border: none;
    color: red;
    left: 2px;
    top: 2px;
`;

const ButtonWrapper = styled.div`
    position: relative;
    height: 10%;
    width: 100%;
    opacity: 1;
    background-color: #000;
    z-index: 3;
`;
const PickerContainer = styled.div`
    width: 100%;
    height: 300px;
    overflow: hidden;
    background-color: black;

    ul {
        list-style: none;
        text-align: center;
    }
`;

const PickerMask = styled.div`
    width: 100%;
    height: 90%;
    bottom: 0;
    position: absolute;
`;
const Up = styled.button`
    position: relative;
    height: 40%;
    width: 100%;
    opacity: 0.1;
    z-index: 2;
`;
const Down = styled.button`
    position: relative;
    height: 40%;
    width: 100%;
    opacity: 0.1;
    z-index: 2;
`;

const Select = styled.div`
    position: relative;
    height: 20%;
    width: 100%;
    opacity: 0.1;
`;

const NumUl = styled.ul`
    padding: 0;
    overflow: hidden;
`;
const NumLi = styled.li`
    font-size: 20px;
    line-height: 50px;
    user-select: none;
`;

export default function NumberPicker() {
    const [numberPicker, setNumberPicker] = useRecoilState(numberPickerState);
    const onNumberSubmit = () => {
        //값 전달
        setNumberPicker(false);
    };

    const [transNumber, setTransNumber] = useState(0);
    const numbers = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    ];
    const NUMBER_HEIGHT = 50;
    const slideRange = transNumber * NUMBER_HEIGHT;
    const numberRef = useRef<HTMLUListElement>(null);
    const increaseNumber = () => {
        if (transNumber === 2) return;
        setTransNumber((prev) => prev + 1);
    };
    const decreaseNumber = () => {
        if (transNumber === -27) return;
        setTransNumber((prev) => prev - 1);
    };

    useEffect(() => {
        if (numberRef.current) {
            numberRef.current.style.transition = 'all 0.2s ease-in-out';
            numberRef.current.style.transform = `translateY(${
                -5 + slideRange
            }px)`;
        }
    }, [transNumber]);

    return (
        <PickerContainer>
            <ButtonWrapper>
                <Submit onClick={onNumberSubmit}>Submit</Submit>
                <Cancel
                    onClick={() => {
                        setNumberPicker(false);
                    }}>
                    Cancel
                </Cancel>
            </ButtonWrapper>
            <PickerMask>
                <Up onClick={increaseNumber} />
                <Select />
                <Down onClick={decreaseNumber} />
            </PickerMask>

            <NumUl ref={numberRef}>
                {numbers.map((num) => (
                    <NumLi key={num}>{num}</NumLi>
                ))}
            </NumUl>
        </PickerContainer>
    );
}
