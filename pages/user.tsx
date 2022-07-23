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
    border-radius: 10px;
    border: 2px solid #ebebeb;
    font-size: 14px;
    line-height: 18px;
    padding: 20px;
`;

const FeedbackContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
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
const UserTitle = styled.h2`
    margin-left: 5px;
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
        return `${year}년 ${convertMonth()}월 ${day}일`;
    };

    useEffect(() => {
        getLoginUserObj(setUserObj, router);
        getMyPlant();
    }, [router]);
    return (
        <>
            <Seo title='회원정보' />
            <UserTitle>
                {NameConverter(userObj.displayName)}님. 반갑습니다!
            </UserTitle>
            <UserContainer>
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
            </UserContainer>
            <br />
            <FeedbackContainer>
                <h4>식물 알람 : v1.0.0</h4>
                <div>- 로그인 및 회원가입 기능</div>
                <div>- 식물 추가 및 알람 설정 기능</div>
                <div>- 알람 설정 시 시간 계산</div>
                <div>- 1일, 당일시 홈 화면 알림 기능</div>
                <div>- 물 주기 기능 시 시간 리셋</div>
                <div>- 오늘 구름 확인 기능</div>
                <br />
                <br />
                <h4>안내사항</h4>
                <div>
                    불편한 점, 피드백, 기능 추가 문의
                    <br />
                    <b>
                        instagram : sy95_055
                        <br /> E-mail : sy95_055@naver.com
                        <br />
                    </b>
                    <br />
                    감사합니다!
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
            <Button onClick={onLogOutClick} name='로그아웃' width='100%' />
            <br />
            <br />
        </>
    );
};

export default User;
