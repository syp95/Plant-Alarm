import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { numberPickerState } from '../atoms/atoms';

const Button = styled.button`
    font-size: 20px;
`;

export default function NumberPicker() {
    const [numberPicker, setNumberPicker] = useRecoilState(numberPickerState);
    const onNumberSubmit = () => {
        //값 전달
        setNumberPicker(false);
    };

    return (
        <>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <Button onClick={onNumberSubmit}>Submit</Button>
        </>
    );
}
