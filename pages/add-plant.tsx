import { addDoc, collection } from 'firebase/firestore';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import { userObjState } from '../atoms/atoms';
import { fbDb } from '../firebaseConfig';
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
    
    const { register, handleSubmit, formState } = useForm();
    
    const onPlantSubmit = async() => {
        let imageUrl = '';
        
        const newPlantObj = {
            plantName: ,
            wateringDate: ,
            createAt: Date.now(),
            creatorId: userObj.uid,
            imageUrl,
        };
        await addDoc(collection(fbDb, 'plant'), newPlantObj);
    }
   
    return (
        <>
            <form>
                <input {...register('plantName', {
                    required:'식물 이름을 입력하세요.'
                })}
                placeholder = '이름이 무엇인가요?'></input>
            </form>
            
            <button onClick={addPlantClick}>ADD</button>
        </>
    );
};

export default AddPlant;
