import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { IPlantData, userObjState } from '../atoms/atoms';
import styled from 'styled-components';

import { fbAuth, fbDb } from '../firebase/firebase';
import { getLoginUserObj } from '../firebase/auth_service';
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore';

import { NameConverter } from '../utils/nameConverter';
import Button from '../components/Button';
import Seo from '../components/Seo';

const UserContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 20px;
    border: 2px solid #ebebeb;
    font-size: 14px;
    line-height: 18px;
    padding: 20px;
`;

const FeedbackContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 20px;
    border: 2px solid #ebebeb;
    font-size: 14px;
    line-height: 18px;
    padding: 20px;
    h4 {
        font-size: 16px;
        margin-top: 0px;
        margin-bottom: 10px;
    }
`;

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
        return `${year}??? ${convertMonth()}??? ${day}???`;
    };

    useEffect(() => {
        getLoginUserObj(setUserObj, router);
        getMyPlant();
    }, [router]);
    return (
        <>
            <Seo title='????????????' />
            <h2>{NameConverter(userObj.displayName)}???. ???????????????!</h2>
            <UserContainer>
                <div>
                    ??????: <b>{userObj.displayName}</b>
                </div>
                <div>
                    ????????? :<b>{userObj.email}</b>
                </div>
                <br />
                <div>
                    <div>
                        ?????? ????????? ????????? ?????? :<b> {createDateConvert()}</b>
                    </div>
                    <div>
                        ???????????? ?????? ??? : <b>{plantList.length}</b>
                    </div>
                </div>
            </UserContainer>
            <br />
            <FeedbackContainer>
                <h4>?????? ?????? : v1.0.0</h4>
                <div>- ????????? ??? ???????????? ??????</div>
                <div>- ?????? ?????? ??? ?????? ?????? ??????</div>
                <div>- ?????? ?????? ??? ?????? ??????</div>
                <div>- 1???, ????????? ??? ?????? ?????? ??????</div>
                <div>- ??? ?????? ?????? ??? ?????? ??????</div>
                <div>- ?????? ?????? ?????? ??????</div>
                <br />
                <br />
                <h4>????????????</h4>
                <div>
                    ????????? ???, ?????????, ?????? ?????? ??????
                    <br />
                    <b>
                        instagram : sy95_055
                        <br /> E-mail : sy95_055@naver.com
                        <br />
                    </b>
                    <br />
                    ???????????????!
                </div>
                <br />
                <br />
                <h4>Stack</h4>
                <div>
                    Front : NextJs / Recoil / ReactQuery / styled-components
                    <br /> Back : Firebase
                </div>
            </FeedbackContainer>
            <br />
            <br />
            <Button onClick={onLogOutClick} name='????????????' width='100%' />
            <br />
            <br />
        </>
    );
};

export default User;
