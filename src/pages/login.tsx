import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Button from '../components/SharedComponents/Button';
import Line from '../components/SharedComponents/Line';
import Seo from '../components/SharedComponents/Seo/Seo';
import ErrorMessage from '../components/SharedComponents/ErrorMessage';
import LeafAnimation from '../components/LoginComponents/LeafAnimation';

import Logo from 'public/Logo.png';
import { ILoginUserData, postLoginData } from 'src/apis/auth';

const LoginContainer = styled.div`
    height: 100%;
    margin-top: 90px;
    position: relative;
    h2 {
        margin-top: 0;
    }
    h5 {
        margin-bottom: 10px;
    }
`;

const LeafContainer = styled.div`
    position: absolute;
    width: 100px;
    height: 100px;
    right: -10px;
    top: -90px;
    opacity: 0.5;
`;

const LogIn: NextPage = () => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const {
        register: loginRegister,
        handleSubmit: loginHandleSubmit,
        formState: loginFormState,
        setFocus,
    } = useForm<ILoginUserData>();

    const goToApp = () => {
        router.push('/');
    };

    // const onSocialLogin = (
    //     e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    // ) => {};

    const onEmailLogin = async (loginData: ILoginUserData) => {
        const data = {
            userid: loginData.userid,
            userpassword: loginData.userpassword,
        };
        postLoginData(data)
            .then(() => {
                goToApp();
            })
            .catch((err) => {
                console.log(err);
                if (err.message === 'Request failed with status code 401') {
                    setErrorMessage('이에밀 혹은 비밀번호가 틀렸습니다.');
                }
            });
    };

    useEffect(() => {
        setFocus('userid');
    }, []);

    return (
        <>
            <Seo title='로그인' />
            <LoginContainer>
                <LeafContainer>
                    <LeafAnimation />
                </LeafContainer>
                <Image src={Logo} width={60} height={60} />
                <h2>로그인</h2>
                <h4>로그인하셔서 식물 알람을 이용해보세요</h4>
                <form
                    onSubmit={loginHandleSubmit((data) => onEmailLogin(data))}
                >
                    <input
                        {...loginRegister('userid', {
                            required: '이메일을 입력하세요.',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: '이메일을 입력해주세요.',
                            },
                        })}
                        placeholder='이메일을 입력하세요.'
                    />
                    <ErrorMessage
                        error={loginFormState.errors.userid?.message}
                    />

                    <input
                        {...loginRegister('userpassword', {
                            required: '비밀번호를 입력하세요.',
                        })}
                        placeholder='비밀번호를 입력하세요.'
                        type='password'
                    />
                    <ErrorMessage
                        error={loginFormState.errors.userpassword?.message}
                    />

                    <Button name='로그인' width='100%' />

                    <ErrorMessage error={errorMessage} />
                </form>
                <Line />
                <h5>소셜 로그인</h5>
                {/* <Button onClick={onSocialLogin} name='Google' width='40px' />
                <span> </span>
                <Button onClick={onSocialLogin} name='Facebook' width='40px' /> */}
                <Line />
                <h5>아이디가 없으신가요?</h5>
                <Button
                    onClick={() => router.push('/register')}
                    name='회원가입'
                    width='100%'
                />
            </LoginContainer>
        </>
    );
};

export default LogIn;
