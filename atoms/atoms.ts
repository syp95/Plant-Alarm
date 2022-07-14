import { atom } from 'recoil';

export interface IUserObj {
    uid?: string | null;
    email?: string | null;
    displayName?: string | null;
}

const userObjState = atom<IUserObj>({
    key: 'userObjState',
    default: { uid: '', email: '', displayName: null },
});

const numberPickerState = atom({
    key: 'numberPcikerState',
    default: false,
});

const pickNumberState = atom({
    key: 'pickNumberState',
    default: 0,
});

export { userObjState, numberPickerState, pickNumberState };
