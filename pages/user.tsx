import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { fbAuth } from '../firebase/firebase';
import { userObjState } from '../atoms/atoms';
import { getLoginUserObj } from '../firebase/auth_service';
import { NameConverter } from '../utils/nameConverter';

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
            <h2>{NameConverter(userObj.displayName)}님. 반갑습니다!</h2>
            <div>
                <span>이메일 : </span>
                {userObj.email}
            </div>
            <div>{userObj.displayName}</div>

            <button onClick={onLogOutClick}>LogOut</button>
        </>
    );
};

export default User;
