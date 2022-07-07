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

export { userObjState };
