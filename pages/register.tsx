import { NextPage } from 'next';
import { updateProfile } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react';

import { useRouter } from 'next/router';
import Seo from '../components/Seo';
import AuthService, { IRegisterForm } from '../firebase/auth_service';
import Button from '../components/Button';
import Line from '../components/Line';
import styled from 'styled-components';
import ErrorMessage from '../components/ErrorMessage';
import LeafAnimation from '../components/LeafAnimation';
import PlantAnimation from '../components/PlantAnimation';

const Container = styled.div`
    h5 {
        margin-bottom: 10px;
    }
`;

const PlantContainer = styled.div`
    position: absolute;
    opacity: 0.5;
    width: 150px;
    height: 150px;
    left: 50%;
    transform: translate(-50%, 30%);

    @media (max-width: 450px) {
        width: 90px;
        height: 90px;
        transform: translate(-50%, 0%);
    }
`;

const Register: NextPage = () => {
    const { register, handleSubmit, watch, formState, setFocus } =
        useForm<IRegisterForm>();

    const passwordRef = useRef<String | null>(null);
    passwordRef.current = watch('regPassword');

    const router = useRouter();
    const authService = new AuthService();

    const goToApp = () => {
        router.push('/');
    };

    const onRegisterValid = (data: IRegisterForm) => {
        authService
            .emailRegister(data) //
            .then((res) => {
                updateProfile(res.user, {
                    displayName: data.regDisPlayName,
                });
                goToApp();
            });
    };
    useEffect(() => {
        setFocus('regId');
    }, []);

    return (
        <>
            <Container>
                <Seo title='Register' />
                <h2>회원가입</h2>
                <form onSubmit={handleSubmit((data) => onRegisterValid(data))}>
                    <input
                        {...register('regId', {
                            required: '이메일을 입력해주세요.',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: '이메일을 입력해주세요.',
                            },
                        })}
                        autoComplete='off'
                        placeholder='이메일을 입력하세요.'
                    />
                    <ErrorMessage error={formState.errors?.regId?.message} />
                    <input
                        {...register('regDisPlayName', {
                            required: '이름을 입력해주세요.',
                            minLength: {
                                value: 2,
                                message: '이름은 2자 이상입니다.',
                            },
                        })}
                        autoComplete='off'
                        placeholder='이름을 입력하세요.'
                    />
                    <ErrorMessage
                        error={formState.errors?.regDisPlayName?.message}
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
                        autoComplete='off'
                        placeholder='비밀번호를 입력하세요.'
                    />
                    <ErrorMessage
                        error={formState.errors?.regPassword?.message}
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
                        autoComplete='off'
                        placeholder='비밀번호 확인'
                    />
                    <ErrorMessage
                        error={formState.errors?.regPasswordConfirm?.message}
                    />

                    <Button name='가입하기' width='100%' />
                </form>

                {formState.errors?.regPasswordConfirm?.type === 'validate' ? (
                    <ErrorMessage error='비밀번호가 일치하지 않습니다.' />
                ) : (
                    ''
                )}
                <Line />
                <h5>이미 아이디가 있으신가요?</h5>
                <Button
                    onClick={() => router.push('/login')}
                    name='로그인 페이지로'
                    width='100%'
                />
                <PlantContainer>
                    <PlantAnimation />
                </PlantContainer>
            </Container>
        </>
    );
};

export default Register;
