import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import { parseNameLength } from '../../utils/parseNameLength';
import Button from '../components/SharedComponents/Button';
import Seo from '../components/SharedComponents/Seo/Seo';
import { getPlantData, IPlantData } from 'src/apis/plant';
import { useQuery } from 'react-query';
import { getUserData, IUserObj, postLogoutData } from 'src/apis/auth';

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
    const { data: userObj } = useQuery<IUserObj>(
        ['plantUser', 'userData'],
        getUserData,
    );
    const { data: plantList } = useQuery<IPlantData[]>(
        ['plantList', 'plant'],
        getPlantData,
    );
    const router = useRouter();
    const onLogOutClick = () => {
        postLogoutData();
        router.push('/login');
    };

    const createDateConvert = () => {
        const createDate = userObj?.createdAt?.slice(0, 10).split(' ');
        if (!createDate) return;
        const date = [...createDate];

        const day = date[0];

        return day;
    };

    return (
        <>
            <Seo title='회원정보' />
            <h2>{parseNameLength(userObj?.username)}님. 반갑습니다!</h2>
            <UserContainer>
                <div>
                    이름: <b>{userObj?.username}</b>
                </div>
                <div>
                    이메일 :<b>{userObj?.userid}</b>
                </div>
                <br />
                <div>
                    <div>
                        식물 알람을 시작한 날짜 :<b> {createDateConvert()}</b>
                    </div>
                    <div>
                        함께하는 식물 수 : <b>{plantList?.length}</b>
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
                    <br /> Back : NodeJs / Express / Sequalize / Redis
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
