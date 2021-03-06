import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { User } from 'firebase/auth';
import AuthService, { ILoginForm } from '../firebase/auth_service';

import Button from '../components/Button';
import Line from '../components/Line';
import Seo from '../components/Seo';
import ErrorMessage from '../components/ErrorMessage';
import LeafAnimation from '../components/LeafAnimation';

import Logo from '../public/Logo.png';

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
                return '????????? ?????? ??????????????? ???????????????.';
            case 'FirebaseError: Firebase: Error (auth/wrong-password).':
                return '????????? ?????? ??????????????? ???????????????.';
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
            <Seo title='?????????' />
            <LoginContainer>
                <LeafContainer>
                    <LeafAnimation />
                </LeafContainer>
                <Image src={Logo} width={60} height={60} />
                <h2>?????????</h2>
                <h4>?????????????????? ?????? ????????? ??????????????????</h4>
                <form
                    onSubmit={loginHandleSubmit((data) => onEmailLogin(data))}
                >
                    <input
                        {...loginRegister('id', {
                            required: '???????????? ???????????????.',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: '???????????? ??????????????????.',
                            },
                        })}
                        placeholder='???????????? ???????????????.'
                    />
                    <ErrorMessage error={loginFormState.errors.id?.message} />

                    <input
                        {...loginRegister('password', {
                            required: '??????????????? ???????????????.',
                        })}
                        placeholder='??????????????? ???????????????.'
                        type='password'
                    />
                    <ErrorMessage
                        error={loginFormState.errors.password?.message}
                    />

                    <Button name='?????????' width='100%' />

                    <ErrorMessage error={firebaseErrorConvert()} />
                </form>
                <Line />
                <h5>?????? ?????????</h5>
                <Button onClick={onSocialLogin} name='Google' width='40px' />
                <span> </span>
                <Button onClick={onSocialLogin} name='Facebook' width='40px' />
                <Line />
                <h5>???????????? ????????????????</h5>
                <Button
                    onClick={() => router.push('/register')}
                    name='????????????'
                    width='100%'
                />
            </LoginContainer>
        </>
    );
};

export default LogIn;
