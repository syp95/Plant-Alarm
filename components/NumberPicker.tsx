import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { numberPickerState, pickNumberState } from '../atoms/atoms';

const Submit = styled.button`
    font-size: 16px;
    position: absolute;
    background-color: transparent;
    border: none;
    color: darkblue;
    right: 2px;
    top: 2px;
    user-select: none;
`;
const Cancel = styled.button`
    font-size: 16px;
    position: absolute;
    background-color: transparent;
    border: none;
    color: red;
    left: 2px;
    top: 2px;
    user-select: none;
`;

const ButtonWrapper = styled.div`
    position: relative;
    height: 10%;
    width: 100%;
    opacity: 1;
    background-color: #000;
    z-index: 3;
`;
const PickerContainer = styled(motion.div)`
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
    z-index: 1;
`;
const Down = styled.button`
    position: relative;
    height: 40%;
    width: 100%;
    opacity: 0.1;
    z-index: 1;
`;

const Select = styled.div`
    position: relative;
    height: 20%;
    width: 100%;
    opacity: 0.1;
`;

const NumUl = styled(motion.ul)`
    padding: 0;
    overflow: hidden;
    user-select: none;

    z-index: 19;
`;
const NumLi = styled.li`
    color: white;
    font-size: 20px;
    line-height: 50px;
    user-select: none;
`;

export default function NumberPicker() {
    const setNumberPicker = useSetRecoilState(numberPickerState);
    const [pnum, setPickNumber] = useRecoilState(pickNumberState);

    const [transNumber, setTransNumber] = useState(0);
    const numbers = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    ];
    const NUMBER_HEIGHT = 50;
    const slideRange = transNumber * NUMBER_HEIGHT;
    const numberRef = useRef<HTMLUListElement>(null);

    const increaseNumber = () => {
        if (transNumber === 17) return;
        setTransNumber((prev) => prev + 1);
    };

    const decreaseNumber = () => {
        if (transNumber === -12) return;
        setTransNumber((prev) => prev - 1);
    };

    const onNumberSubmit = () => {
        const pickNumber = 18 - transNumber;
        console.log(pickNumber);

        setPickNumber(pickNumber);

        console.log(pnum);

        setNumberPicker(false);
    };

    useEffect(() => {
        if (numberRef.current) {
            numberRef.current.style.transition = 'all 0.2s ease-in-out';
            numberRef.current.style.transform = `translateY(${
                -5 - (NUMBER_HEIGHT * numbers.length) / 2 + slideRange
            }px)`;
        }
    }, [transNumber]);

    useEffect(() => {
        if (numberRef.current) {
            numberRef.current.style.transform = `translateY(${
                -5 - (NUMBER_HEIGHT * numbers.length) / 2
            }px)`;
        }
    }, []);

    return (
        <PickerContainer>
            <ButtonWrapper>
                <Submit onClick={onNumberSubmit}>Submit</Submit>
                <Cancel
                    onClick={() => {
                        setNumberPicker(false);
                    }}
                >
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
