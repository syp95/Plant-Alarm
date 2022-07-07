import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { fbAuth } from '../firebaseConfig';
import { userObjState } from '../atoms/atoms';
import getUserObj from '../utils/getUserObj';

const User: NextPage = () => {
    const router = useRouter();
    const onLogOutClick = () => {
        sessionStorage.removeItem('PlantAlarmToken');
        fbAuth.signOut();
        router.push('/login');
    };
    const [userObj, setUserObj] = useRecoilState(userObjState);
    useEffect(() => {
        getUserObj(setUserObj);
    }, []);
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
