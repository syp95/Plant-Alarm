import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const router = useRouter();
    const addPlantClick = () => {
        router.push('/add-plant');
    };
    return (
        <>
            <div>main</div>
            <button onClick={addPlantClick}>ADD</button>
        </>
    );
};

export default Home;
