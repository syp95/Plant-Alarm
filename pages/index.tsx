import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Seo from '../components/Seo';

const Home: NextPage = () => {
    const router = useRouter();
    const addPlantClick = () => {
        router.push('/add-plant');
    };
    return (
        <>
            <Seo title='Home' />
            <div>main</div>
            <article className='plant-main'>
                <button className='plant-listbtn'>LIST</button>

                <div className='plant-profile'>
                    <div className='plant-img'></div>
                </div>

                <h2 className='plant-name'>카스테라</h2>

                <div className='plant-watertime'>
                    <span>7일</span>
                    <span>10시간</span>
                    <span>43분</span>
                </div>

                <button onClick={addPlantClick}>ADD</button>
            </article>
        </>
    );
};

export default Home;
