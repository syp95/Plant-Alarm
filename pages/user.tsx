import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { fbAuth, fbDb } from '../firebase/firebase';
import { IPlantData, userObjState } from '../atoms/atoms';
import { getLoginUserObj } from '../firebase/auth_service';
import { NameConverter } from '../utils/nameConverter';
import Button from '../components/Button';
import Seo from '../components/Seo';
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore';

const User: NextPage = () => {
    const [userObj, setUserObj] = useRecoilState(userObjState);
    const [plantList, setPlantList] = useState<IPlantData[]>([]);
    const router = useRouter();
    const onLogOutClick = () => {
        fbAuth.signOut();
        router.push('/login');
    };

    const getMyPlant = async () => {
        const q = query(
            collection(fbDb, 'plant'),
            where('creatorId', '==', userObj.uid),
            orderBy('createAt', 'desc'),
        );
        await onSnapshot(q, (snapshot) => {
            const plantArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPlantList(plantArr);
        });
    };

    const createDateConvert = () => {
        const createDate = userObj.createDate?.slice(5, 16).split(' ');
        if (!createDate) return;
        const date = [...createDate];
        const year = date[2];
        const month = date[1];
        const day = date[0];
        const convertMonth = () => {
            switch (month) {
                case 'Jan':
                    return 1;
                case 'Feb':
                    return 2;
                case 'Mar':
                    return 3;
                case 'Apr':
                    return 4;
                case 'May':
                    return 5;
                case 'Jun':
                    return 6;
                case 'Jul':
                    return 7;
                case 'Aug':
                    return 8;
                case 'Sep':
                    return 9;
                case 'Oct':
                    return 10;
                case 'Nov':
                    return 11;
                case 'Dec':
                    return 12;
            }
        };
        return `${year}년 ${convertMonth()}월 ${day}일`;
    };

    useEffect(() => {
        getLoginUserObj(setUserObj, router);
        getMyPlant();
    }, [router]);
    return (
        <>
            <Seo title='회원정보' />
            <h2>{NameConverter(userObj.displayName)}님. 반갑습니다!</h2>
            <div>
                이름: <b>{userObj.displayName}</b>
            </div>
            <div>
                이메일 :<b>{userObj.email}</b>
            </div>
            <br />
            <div>
                <div>
                    식물 알람을 시작한 날짜 :<b> {createDateConvert()}</b>
                </div>
                <div>
                    함께하는 식물 수 : <b>{plantList.length}</b>
                </div>
            </div>
            <br />
            <Button onClick={onLogOutClick} name='로그아웃' width='100%' />
            <br />
            <br />
            <div>
                불편한 사항, 피드백, 기능 추가 문의는 <br />
                01035213095(박승영) 으로 해주세요.
                <br />
                감사합니다!
            </div>
        </>
    );
};

export default User;
