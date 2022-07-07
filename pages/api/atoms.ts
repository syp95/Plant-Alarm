import { atom } from 'recoil';

const userObjState = atom({
    key: 'userObjState',
    default: {},
});

export { userObjState };
