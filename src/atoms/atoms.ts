import { atom } from 'recoil';
import { v1 } from 'uuid';

const numberPickerState = atom({
    key: `numberPcikerState/${v1()}`,
    default: false,
});

const pickNumberState = atom({
    key: `pickNumberState/${v1()}`,
    default: 0,
});

export { numberPickerState, pickNumberState };
