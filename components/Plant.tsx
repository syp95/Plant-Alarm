import { deleteDoc, doc } from 'firebase/firestore';
import { fbDb } from '../firebase/firebase';

const Plant = ({ plantData }: any) => {
    const onDelete = async () => {
        const ok = window.confirm('정말 지우실건가요?');
        if (ok) {
            console.log(plantData.id);
            await deleteDoc(doc(fbDb, 'plant', plantData.id));
        }
    };

    return (
        <>
            <div>{plantData.plantName}</div>
            <div>{plantData.wateringDate}일 마다 한번씩</div>
            <div>{plantData.lastWateringDate}</div>
            <button onClick={onDelete}>delete</button>
            <button>update</button>
        </>
    );
};

export default Plant;
