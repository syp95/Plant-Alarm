import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userObjState } from '../atoms/atoms';
import getUserObj from '../utils/getUserObj';

const PlantList: NextPage = () => {
    const [userObj, setUserObj] = useRecoilState(userObjState);
    useEffect(() => {
        getUserObj(setUserObj);
    }, []);
    return (
        <>
            <div>PlantList</div>
        </>
    );
};

export default PlantList;
