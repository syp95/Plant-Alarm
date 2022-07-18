import { User } from 'firebase/auth';
import AuthService, { ILoginForm } from '../firebase/auth_service';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../components/Button';
import Line from '../components/Line';
import Seo from '../components/Seo';
import ErrorMessage from '../components/ErrorMessage';
import Logo from '../public/Logo.png';
import PlantAnimation from '../components/PlantAnimation';
import LeafAnimation from '../components/LeafAnimation';

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

    const authService = new AuthService();
    const {
        register: loginRegister,
        handleSubmit: loginHandleSubmit,
        formState: loginFormState,
        setFocus,
    } = useForm<ILoginForm>();

    const [firebaseErrorMessage, setFirebaseErrorMessage] = useState('');
    const goToApp = () => {
        router.push('/');
    };

    const onSocialLogin = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        authService //
            .socialLogin(e.currentTarget.name)
            .then((data) => goToApp());
    };

    const onEmailLogin = (loginData: ILoginForm) => {
        authService //
            .emailLogin(loginData)
            .then((data) => goToApp())
            .catch((err) => {
                console.log(`not login: ${err}`);
                setFirebaseErrorMessage(`${err}`);
            });
    };

    const firebaseErrorConvert = () => {
        switch (firebaseErrorMessage) {
            case 'FirebaseError: Firebase: Error (auth/user-not-found).':
                return '이메일 혹은 비밀번호가 틀렸습니다.';
            case 'FirebaseError: Firebase: Error (auth/wrong-password).':
                return '이메일 혹은 비밀번호가 틀렸습니다.';
            default:
                return '';
        }
    };

    useEffect(() => {
        authService.onAuthChange((user: User) => {
            user && goToApp();
        });
        setFocus('id');
    }, []);

    return (
        <>
            <Seo title='Login' />
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

                    <ErrorMessage error={firebaseErrorConvert()} />
                </form>
                <Line />
                <h5>소셜 로그인</h5>
                <Button onClick={onSocialLogin} name='Google' width='40px' />
                <span> </span>
                <Button onClick={onSocialLogin} name='Facebook' width='40px' />
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
