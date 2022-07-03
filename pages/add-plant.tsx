import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const AddPlant: NextPage = () => {
    const router = useRouter();
    const addPlantClick = () => {
        router.push('/');
    };
    return (
        <>
            <div>AddPlant</div>
            <button onClick={addPlantClick}>ADD</button>
        </>
    );
};

export default AddPlant;
