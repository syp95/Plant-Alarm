import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import Seo from '../components/Seo';
import { fbAuth } from '../firebaseConfig';
import { userObjState } from '../atoms/atoms';
import getUserObj from '../utils/getUserObj';

interface ILoginForm {
    id: string;
    password: string;
}

const LogIn: NextPage = () => {
    const {
        register: loginRegister,
        handleSubmit: loginHandleSubmit,
        formState: loginFormState,
    } = useForm<ILoginForm>();

    const router = useRouter();

    const login = (logindata: ILoginForm) => {
        signInWithEmailAndPassword(fbAuth, logindata.id, logindata.password)
            .then((res) => {
                sessionStorage.setItem('PlantAlarmToken', res.user.accessToken);
                router.push('/');
            })
            .catch((err) => console.log('not login'));
    };

    const googleProvider = new GoogleAuthProvider();
    const signUpWithGoogle = () => {
        signInWithPopup(fbAuth, googleProvider).then((res) => {
            sessionStorage.setItem('PlantAlarmToken', res.user.accessToken);
            router.push('/');
        });
    };

    const [userObj, setUserObj] = useRecoilState(userObjState);

    useEffect(() => {
        getUserObj(setUserObj);
    }, []);

    useEffect(() => {
        let token = sessionStorage.getItem('PlantAlarmToken');
        if (token) {
            router.push('/');
        }
    }, []);

    return (
        <>
            <Seo title='Login' />
            <h4>LogIn</h4>
            <form onSubmit={loginHandleSubmit((data) => login(data))}>
                <input
                    {...loginRegister('id', {
                        required: '이메일을 입력하세요.',
                    })}
                    placeholder='이메일을 입력하세요.'
                />
                <input
                    {...loginRegister('password', {
                        required: '비밀번호를 입력하세요.',
                    })}
                    placeholder='비밀번호를 입력하세요.'
                />
                <button>로그인</button>
            </form>
            <button onClick={signUpWithGoogle}>구글 로그인</button>

            <button onClick={() => router.push('/register')}>회원 가입</button>
        </>
    );
};

export default LogIn;
