import { User } from 'firebase/auth';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import Seo from '../components/Seo';
import AuthService, { ILoginForm } from '../firebase/auth_service';

const LogIn: NextPage = () => {
    const router = useRouter();

    const emailRef = useRef<HTMLInputElement>(null);

    const authService = new AuthService();
    const {
        register: loginRegister,
        handleSubmit: loginHandleSubmit,
        formState: loginFormState,
    } = useForm<ILoginForm>();

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
            .catch((err) => console.log(`not login: ${err}`));
    };

    useEffect(() => {
        authService.onAuthChange((user: User) => {
            user && goToApp();
        });
        emailRef.current?.focus();
    }, []);

    return (
        <>
            <Seo title='Login' />
            <h4>LogIn</h4>
            <form onSubmit={loginHandleSubmit((data) => onEmailLogin(data))}>
                <input
                    {...loginRegister('id', {
                        required: '이메일을 입력하세요.',
                    })}
                    placeholder='이메일을 입력하세요.'
                    ref={emailRef}
                />
                <input
                    {...loginRegister('password', {
                        required: '비밀번호를 입력하세요.',
                    })}
                    placeholder='비밀번호를 입력하세요.'
                />
                <button>로그인</button>
            </form>
            <button onClick={onSocialLogin} name='Google'>
                구글 로그인
            </button>
            <button onClick={onSocialLogin} name='Facebook'>
                페이스북 로그인
            </button>

            <button onClick={() => router.push('/register')}>회원 가입</button>
        </>
    );
};

export default LogIn;
