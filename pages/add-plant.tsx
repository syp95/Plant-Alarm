import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { fbAuth } from '../firebaseConfig';
import { userObjState } from './api/atoms';

const AddPlant: NextPage = () => {
    const router = useRouter();
    const addPlantClick = () => {
        router.push('/');
    };
    const [userObj, setUserObj] = useRecoilState(userObjState);
    useEffect(() => {
        fbAuth.onAuthStateChanged((user) => {
            if (user) {
                setUserObj({
                    email: user?.email,
                    uid: user?.uid,
                    displayName: user.displayName ? user.displayName : '',
                });
            }
        });
    }, []);
    return (
        <>
            {userObj.uid}
            <div>AddPlant</div>
            <button onClick={addPlantClick}>ADD</button>
        </>
    );
};

export default AddPlant;
