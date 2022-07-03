import type { NextPage } from 'next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IRegisterForm {
    regId: String;
    regPassword: String;
    regPasswordConfirm: String;
}

interface ILoginForm {
    id: String;
    password: String;
}

const LogIn: NextPage = () => {
    const [registerPage, setRegisterPage] = useState(false);
    const {
        register: loginRegister,
        handleSubmit: loginHandleSubmit,
        formState: loginFormState,
    } = useForm<ILoginForm>();
    const { register, handleSubmit, formState } = useForm<IRegisterForm>();
    const toggleRegisterPage = () => {
        setRegisterPage((prev) => !prev);
    };

    const onRegisterValid = (data: any) => {
        console.log(data);
        if (data.regPassword === data.regPasswordConfirm) {
            console.log('register');
            setRegisterPage(false);
        } else {
            console.log('please check password');
        }
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
                                minLength: { value: 5, message: '5자 이상' },
                            })}
                            placeholder='아이디를 입력하세요.'
                        />
                        <input
                            {...register('regPassword', {
                                required: '비밀번호를 입력해주세요.',
                                minLength: { value: 6, message: '6자 이상' },
                            })}
                            placeholder='비밀번호를 입력하세요.'
                        />
                        <input
                            {...register('regPasswordConfirm', {
                                required: '비밀번호 확인을 입력해주세요.',
                                minLength: { value: 6, message: '6자 이상' },
                            })}
                            placeholder='비밀번호 확인'
                        />
                        <button>가입하기</button>
                    </form>
                    <div>{formState.errors?.regId?.message}</div>
                    <div>{formState.errors?.regPassword?.message}</div>
                    <div>{formState.errors?.regPasswordConfirm?.message}</div>
                    <div>이미 아이디가 있으신가요?</div>
                    <button onClick={toggleRegisterPage}>
                        로그인 페이지로
                    </button>
                </>
            ) : (
                <>
                    <h4>LogIn</h4>
                    <form>
                        <input
                            {...loginRegister('id', { required: true })}
                            placeholder='아이디를 입력하세요.'
                        />
                        <input
                            {...loginRegister('password', { required: true })}
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
