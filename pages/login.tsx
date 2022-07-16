import { User } from 'firebase/auth';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';

import Seo from '../components/Seo';
import AuthService, { ILoginForm } from '../firebase/auth_service';

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

            <h2>로그인</h2>
            <h4>로그인하셔서 식물 알람을 이용해보세요</h4>
            <form onSubmit={loginHandleSubmit((data) => onEmailLogin(data))}>
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
                <div>{loginFormState.errors.id?.message}</div>
                <input
                    {...loginRegister('password', {
                        required: '비밀번호를 입력하세요.',
                    })}
                    placeholder='비밀번호를 입력하세요.'
                    type='password'
                />
                <div>{loginFormState.errors.password?.message}</div>
                <Button name='로그인' width='100%' />

                <div>{firebaseErrorConvert()}</div>
            </form>
            <button onClick={onSocialLogin} name='Google'>
                구글 로그인
            </button>
            <button onClick={onSocialLogin} name='Facebook'>
                페이스북 로그인
            </button>

            <Button
                onClick={() => router.push('/register')}
                name='회원가입'
                width='100%'
            />
        </>
    );
};

export default LogIn;
