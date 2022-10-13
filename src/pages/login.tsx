import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Button from '../components/Button';
import Line from '../components/Line';
import Seo from '../components/Seo';
import ErrorMessage from '../components/ErrorMessage';
import LeafAnimation from '../components/LeafAnimation';

import Logo from 'public/Logo.png';
import axios from 'axios';

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

interface ILoginForm {
    id: string;
    password: string;
}

const LogIn: NextPage = () => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const {
        register: loginRegister,
        handleSubmit: loginHandleSubmit,
        formState: loginFormState,
        setFocus,
    } = useForm<ILoginForm>();

    const goToApp = () => {
        router.push('/');
    };

    // const onSocialLogin = (
    //     e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    // ) => {};

    const onEmailLogin = async (loginData: ILoginForm) => {
        const data = {
            userid: loginData.id,
            userpassword: loginData.password,
        };

        await axios
            .post('/plantapi/api/auth/login', data, {
                withCredentials: true,
            })
            .then((res) => {
                const { accessToken } = res.data.logindata;
                localStorage.setItem('userId', data.userid);
                localStorage.setItem('access', accessToken);

                // 리코일 로그인 true로. 기본은 false

                axios.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${accessToken}`;

                setTimeout(async () => {
                    await axios
                        .post('/plantapi/api/auth/refresh', {})
                        .then((res) => {
                            const { accessToken } = res.data.logindata;
                            localStorage.setItem('access', accessToken);

                            axios.defaults.headers.common[
                                'Authorization'
                            ] = `Bearer ${accessToken}`;
                        });
                }, 3000);
            })
            .catch((err) => {
                setErrorMessage(err);
                console.log(`login error : ${err}`);
            });
        goToApp();
    };

    useEffect(() => {
        setFocus('id');
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
                        {...loginRegister('id', {
                            required: '이메일을 입력하세요.',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: '이메일을 입력해주세요.',
                            },
                        })}
                        placeholder='이메일을 입력하세요.'
                    />
                    <ErrorMessage error={loginFormState.errors.id?.message} />

                    <input
                        {...loginRegister('password', {
                            required: '비밀번호를 입력하세요.',
                        })}
                        placeholder='비밀번호를 입력하세요.'
                        type='password'
                    />
                    <ErrorMessage
                        error={loginFormState.errors.password?.message}
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
