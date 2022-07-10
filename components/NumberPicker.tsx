import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
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

export default function NumberPicker() {
    const [numberPicker, setNumberPicker] = useRecoilState(numberPickerState);
    const onNumberSubmit = () => {
        //값 전달
        setNumberPicker(false);
    };
    const [transYNumber, setTransYNumber] = useState(0);

    const increaseNumber = () => {
        setTransYNumber((prev) => prev + 50);
    };
    const decreaseNumber = () => {
        setTransYNumber((prev) => prev - 50);
    };

    const numberInfo = useRef();

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
            <AnimatePresence>
                <ul ref={numberInfo}>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                    <li>8</li>
                    <li>9</li>
                    <li>10</li>
                    <li>11</li>
                    <li>12</li>
                    <li>13</li>
                    <li>14</li>
                    <li>15</li>
                    <li>16</li>
                    <li>17</li>
                    <li>18</li>
                    <li>19</li>
                    <li>20</li>
                    <li>21</li>
                    <li>22</li>
                    <li>23</li>
                    <li>24</li>
                    <li>25</li>
                    <li>26</li>
                    <li>27</li>
                    <li>28</li>
                    <li>29</li>
                    <li>30</li>
                </ul>
            </AnimatePresence>
        </PickerContainer>
    );
}
