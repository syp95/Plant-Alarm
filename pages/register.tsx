import { NextPage } from 'next';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { fbAuth } from '../firebaseConfig';
import { useRouter } from 'next/router';
import Seo from '../components/Seo';

interface IRegisterForm {
    regId: string;
    regPassword: string;
    regPasswordConfirm: string;
    regDisPlayName: string;
}

const Register: NextPage = () => {
    const { register, handleSubmit, watch, formState } =
        useForm<IRegisterForm>();

    const passwordRef = useRef<String | null>(null);
    passwordRef.current = watch('regPassword');

    const router = useRouter();

    const onRegisterValid = (data: IRegisterForm) => {
        createUserWithEmailAndPassword(
            fbAuth,
            data.regId,
            data.regPassword,
        ).then((res) => {
            console.log(res.user);
            updateProfile(res.user, {
                displayName: data.regDisPlayName,
            });
            sessionStorage.setItem('PlantAlarmToken', res.user.accessToken);
            router.push('/');
        });
    };

    useEffect(() => {
        let token = sessionStorage.getItem('PlantAlarmToken');
        if (token) {
            router.push('/');
        }
    }, []);
    return (
        <>
            <Seo title='Register' />
            <h4>Register</h4>
            <form onSubmit={handleSubmit((data) => onRegisterValid(data))}>
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
                    {...register('regDisPlayName', {
                        required: '이름을 입력해주세요.',
                        minLength: {
                            value: 2,
                            message: '이름은 2자 이상입니다.',
                        },
                    })}
                    placeholder='이름을 입력하세요.'
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
                        validate: (value) => value === passwordRef.current,
                    })}
                    type='password'
                    placeholder='비밀번호 확인'
                />
                <button>가입하기</button>
            </form>
            <div>{formState.errors?.regId?.message}</div>
            <div>{formState.errors?.regPassword?.message}</div>
            <div>{formState.errors?.regPasswordConfirm?.message}</div>
            {formState.errors?.regPasswordConfirm?.type === 'validate' ? (
                <div>비밀번호가 일치하지 않습니다.</div>
            ) : (
                ''
            )}
            <div>이미 아이디가 있으신가요?</div>
            <button onClick={() => router.push('/login')}>
                로그인 페이지로
            </button>
        </>
    );
};

export default Register;
