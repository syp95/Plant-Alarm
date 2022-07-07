import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { fbAuth } from '../firebaseConfig';
import { userObjState } from '../atoms/atoms';
import getUserObj from '../utils/getUserObj';

const AddPlant: NextPage = () => {
    const router = useRouter();
    const addPlantClick = () => {
        router.push('/');
    };
    const [userObj, setUserObj] = useRecoilState(userObjState);
    useEffect(() => {
        getUserObj(setUserObj);
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
