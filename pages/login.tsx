import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Seo from '../components/Seo';
import { fbAuth } from '../firebaseConfig';
import { userObjState } from './api/atoms';

interface IRegisterForm {
    regId: string;
    regPassword: string;
    regPasswordConfirm: string;
}

interface ILoginForm {
    id: string;
    password: string;
}

const LogIn: NextPage = () => {
    const [registerPage, setRegisterPage] = useState(false);
    const {
        register: loginRegister,
        handleSubmit: loginHandleSubmit,
        formState: loginFormState,
    } = useForm<ILoginForm>();
    const { register, handleSubmit, watch, formState } =
        useForm<IRegisterForm>();
    const toggleRegisterPage = () => {
        setRegisterPage((prev) => !prev);
    };

    const passwordRef = useRef<String | null>(null);
    passwordRef.current = watch('regPassword');

    const router = useRouter();

    const login = (logindata: ILoginForm) => {
        signInWithEmailAndPassword(fbAuth, logindata.id, logindata.password)
            .then((res) => {
                sessionStorage.setItem('PlantAlarmToken', res.user.accessToken);

                router.push('/');
            })
            .catch((err) => console.log('not login'));
    };

    const onRegisterValid = (data: IRegisterForm) => {
        createUserWithEmailAndPassword(
            fbAuth,
            data.regId,
            data.regPassword,
        ).then((res) => {
            sessionStorage.setItem('PlantAlarmToken', res.user.accessToken);
            router.push('/');
        });
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
        fbAuth.onAuthStateChanged((user) => {
            if (user) {
                setUserObj({
                    email: user?.email,
                    uid: user?.uid,
                    displayName: user.displayName ? user.displayName : '',
                });
            }
        });
    }, []);

    useEffect(() => {
        let token = sessionStorage.getItem('PlantAlarmToken');
        if (token) {
            router.push('/');
        }
    }, []);

    return (
        <>
            {registerPage ? (
                <>
                    <Seo title='Register' />
                    <h4>Register</h4>
                    <form
                        onSubmit={handleSubmit((data) =>
                            onRegisterValid(data),
                        )}>
                        <input
                            {...register('regId', {
                                required: '이메일을 입력해주세요.',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: '이메일을 입력해주세요.',
                                },
                            })}
                            placeholder='이메일을 입력하세요.'
                        />

                        <input
                            {...register('regPassword', {
                                required: '비밀번호를 입력해주세요.',
                                minLength: {
                                    value: 6,
                                    message: '비밀번호는 6자 이상 입니다',
                                },
                            })}
                            type='password'
                            placeholder='비밀번호를 입력하세요.'
                        />
                        <input
                            {...register('regPasswordConfirm', {
                                required: '비밀번호 확인을 입력해주세요.',
                                minLength: {
                                    value: 6,
                                    message: '비밀번호 확인은 6자 이상 입니다',
                                },
                                validate: (value) =>
                                    value === passwordRef.current,
                            })}
                            type='password'
                            placeholder='비밀번호 확인'
                        />
                        <button>가입하기</button>
                    </form>
                    <div>{formState.errors?.regId?.message}</div>
                    <div>{formState.errors?.regPassword?.message}</div>
                    <div>{formState.errors?.regPasswordConfirm?.message}</div>
                    {formState.errors?.regPasswordConfirm?.type ===
                    'validate' ? (
                        <div>비밀번호가 일치하지 않습니다.</div>
                    ) : (
                        ''
                    )}
                    <div>이미 아이디가 있으신가요?</div>
                    <button onClick={toggleRegisterPage}>
                        로그인 페이지로
                    </button>
                </>
            ) : (
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

                    <button onClick={toggleRegisterPage}>회원 가입</button>
                </>
            )}
        </>
    );
};

export default LogIn;
