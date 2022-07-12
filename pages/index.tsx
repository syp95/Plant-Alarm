import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userObjState } from '../atoms/atoms';

import Seo from '../components/Seo';
import getUserObj from '../utils/getUserObj';

const Home: NextPage = () => {
    const router = useRouter();
    const [userObj, setUserObj] = useRecoilState(userObjState);
    const addPlantClick = () => {
        router.push('/add-plant');
    };
    useEffect(() => {
        getUserObj(setUserObj);
    }, []);

    const disPlayNameConvert = () => {
        let userName = userObj.displayName;
        if (userName === null || userName === undefined) {
            return '';
        }
        if (userName.length === 3) {
            return userName.slice(1, 3);
        } else if (userName.length === 4) {
            return userName.slice(2, 4);
        } else {
            return userName;
        }
    };
    return (
        <>
            <Seo title='Home' />
            <div>{disPlayNameConvert()}님의 식물 알람</div>
            <article className='plant-main'>
                <button className='plant-listbtn'>LIST</button>

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
