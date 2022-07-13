import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userObjState } from '../atoms/atoms';

import Seo from '../components/Seo';
import { getLoginUserObj } from '../firebase/auth_service';
import { NameConverter } from '../utils/nameConverter';

const Home: NextPage = () => {
    const router = useRouter();
    const [userObj, setUserObj] = useRecoilState(userObjState);
    const addPlantClick = () => {
        router.push('/add-plant');
    };
    useEffect(() => {
        getLoginUserObj(setUserObj, router);
    }, []);

    const disPlayName = NameConverter(userObj.displayName);
    return (
        <>
            <Seo title='Home' />
            <div>{disPlayName}님의 식물 알람</div>
            <article className='plant-main'>
                <div className='plant-profile'>
                    <div className='plant-img'></div>
                </div>

                <h2 className='plant-name'>카스테라</h2>

                <div className='plant-watertime'>
                    <span></span>
                </div>

                <button onClick={addPlantClick}>ADD</button>
            </article>
        </>
    );
};

export default Home;
