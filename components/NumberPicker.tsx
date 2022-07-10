import { useRecoilState } from 'recoil';
import { numberPickerState } from '../atoms/atoms';

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
            <button onClick={onNumberSubmit}>Submit</button>
        </>
    );
}
