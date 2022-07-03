import type { NextPage } from 'next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const LogIn: NextPage = () => {
    const [registerPage, setRegisterPage] = useState(false);
    const { register: loginRegister, handleSubmit: loginHandleSubmit } =
        useForm();
    const { register, handleSubmit } = useForm();
    const toggleRegisterPage = () => {
        setRegisterPage((prev) => !prev);
    };

    const onValid = (data: any) => {
        console.log(data);
        setRegisterPage(false);
    };
    return (
        <>
            {registerPage ? (
                <>
                    <h4>Register</h4>
                    <form onSubmit={handleSubmit(onValid)}>
                        <input
                            {...register('regId')}
                            placeholder='아이디를 입력하세요.'
                        />
                        <input
                            {...register('regPassword')}
                            placeholder='비밀번호를 입력하세요.'
                        />
                        <input
                            {...register('regPasswordConfirm')}
                            placeholder='비밀번호 확인'
                        />
                        <button>가입하기</button>
                    </form>
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
                            {...loginRegister('id')}
                            placeholder='아이디를 입력하세요.'
                        />
                        <input
                            {...loginRegister('password')}
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
