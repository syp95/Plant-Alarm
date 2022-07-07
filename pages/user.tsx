import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { fbAuth } from '../firebaseConfig';
import { userObjState } from './api/atoms';

const User: NextPage = () => {
    const router = useRouter();
    const onLogOutClick = () => {
        sessionStorage.removeItem('PlantAlarmToken');
        fbAuth.signOut();
        router.push('/login');
    };
    const [userObj, setUserObj] = useRecoilState(userObjState);

    useEffect(() => {
        const user = fbAuth.currentUser;
        setTimeout(
            () =>
                setUserObj({
                    email: user?.email,
                    uid: user?.uid,
                    displayName: user?.displayName ? user.displayName : '',
                }),
            10,
        );
    });

    return (
        <>
            <div>{userObj.email}</div>
            <div>{userObj.displayName}</div>
            <div>User</div>
            <button onClick={onLogOutClick}>LogOut</button>
        </>
    );
};

export default User;
