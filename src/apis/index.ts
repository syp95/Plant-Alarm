import axios from 'axios';
import { useMutation } from 'react-query';

export interface IUserObj {
    createdAt: string;
    id: number;
    updatedAt: string;
    userid: string;
    username: string;
    userpassword: string;
}

export interface IPlantData {
    createdAt: 'string';
    creatorId: 'string';
    id: number;
    plantName?: string;
    wateringDate?: number;
    lastWateringDate?: string;
    imageUrl?: string;
}

export interface IPlantDataProps {
    plantData: IPlantData;
}

export interface ILoginUserData {
    userid: string;
    userpassword: string;
}

export interface ILoginUserPostData {
    userid: string;
    accessToken: string;
}

export interface IRegisterUserPostData {
    userid: string;
    userpassword: string;
    username: string;
}

export const getPlantData = async () => {
    const userId = localStorage.getItem('userId');
    const { data } = await axios.get(`/plantapi/api/plants/id/${userId}`, {
        withCredentials: true,
    });

    return data;
};

export const getUserData = async () => {
    const userId = localStorage.getItem('userId');
    const { data } = await axios.get(`/plantapi/api/auth/id/${userId}`, {
        withCredentials: true,
    });

    return data;
};

export const postLoginData = async (data: ILoginUserData) => {
    await axios
        .post('/plantapi/api/auth/login', data, {
            withCredentials: true,
        })
        .then((res) => {
            const { accessToken } = res.data.logindata;
            localStorage.setItem('userId', data.userid);
            localStorage.setItem('access', accessToken);

            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${accessToken}`;

            setTimeout(async () => {
                await axios
                    .post('/plantapi/api/auth/refresh', {})
                    .then((res) => {
                        const { accessToken } = res.data.logindata;
                        localStorage.setItem('access', accessToken);

                        axios.defaults.headers.common[
                            'Authorization'
                        ] = `Bearer ${accessToken}`;
                    });
            }, 24 * 3600 * 1000);
        });
};

export const postRegisterData = async (registerData: IRegisterUserPostData) => {
    await axios.post('/plantapi/api/auth/register', registerData, {
        withCredentials: true,
    });
};
