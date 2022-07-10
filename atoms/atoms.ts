import { atom } from 'recoil';

interface IUserObj {
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

export { userObjState, numberPickerState };
