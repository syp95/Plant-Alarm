import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { fbAuth } from '../firebaseConfig';

interface IRegisterForm {
    regId: String;
    regPassword: String;
    regPasswordConfirm: String;
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
                console.log(res.user.accessToken);
                sessionStorage.setItem('Token', res.user.accessToken);
                router.push('/user');
            })
            .catch((err) => console.log('not login'));
    };

    const onRegisterValid = (data: IRegisterForm) => {
        console.log(data);
        //DB로 아이디 푸쉬하기
        setRegisterPage(false);
    };

    return (
        <>
            {registerPage ? (
                <>
                    <h4>Register</h4>
                    <form onSubmit={handleSubmit(onRegisterValid)}>
                        <input
                            {...register('regId', {
                                required: '아이디를 입력해주세요.',
                                minLength: {
                                    value: 5,
                                    message: '아이디는 5자 이상 입니다.',
                                },
                            })}
                            placeholder='아이디를 입력하세요.'
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
                    <h4>LogIn</h4>
                    <form onSubmit={loginHandleSubmit((data) => login(data))}>
                        <input
                            {...loginRegister('id', {
                                required: '아이디를 입력하세요.',
                            })}
                            placeholder='아이디를 입력하세요.'
                        />
                        <input
                            {...loginRegister('password', {
                                required: '비밀번호를 입력하세요.',
                            })}
                            placeholder='비밀번호를 입력하세요.'
                        />
                        <button>로그인</button>
                    </form>

                    <button onClick={toggleRegisterPage}>회원 가입</button>
                </>
            )}
        </>
    );
};

export default LogIn;
