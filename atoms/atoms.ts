import { atom } from 'recoil';
import { v1 } from 'uuid';

export interface IUserObj {
    uid?: string | null;
    email?: string | null;
    displayName?: string | null;
}

const userObjState = atom<IUserObj>({
    key: `userObjState/${v1()}`,
    default: { uid: '', email: '', displayName: null },
});

const numberPickerState = atom({
    key: `numberPcikerState/${v1()}`,
    default: false,
});

const pickNumberState = atom({
    key: `pickNumberState/${v1()}`,
    default: 0,
});

export { userObjState, numberPickerState, pickNumberState };
