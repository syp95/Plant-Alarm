import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { fbAuth } from '../firebase/firebase';
import { userObjState } from '../atoms/atoms';
import { getLoginUserObj } from '../firebase/auth_service';

const User: NextPage = () => {
    const router = useRouter();
    const onLogOutClick = () => {
        fbAuth.signOut();
        router.push('/login');
    };
    const [userObj, setUserObj] = useRecoilState(userObjState);
    useEffect(() => {
        getLoginUserObj(setUserObj, router);
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
