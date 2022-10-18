import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

export interface IUserObj {
    createdAt: string;
    id: number;
    updatedAt: string;
    userid: string;
    username: string;
    userpassword: string;
}

export interface IPlantData {
    createdAt?: string;
    creatorId?: string;
    id?: number;
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

export interface IPutPlantObj {
    id?: number;
    putObj?: IPlantData;
}

export const getPlantData = async () => {
    const userId = localStorage.getItem('userId');
    const { data } = await axios.get(`/plantapi/api/plants/id/${userId}`, {
        withCredentials: true,
    });

    return data;
};

export const postPlantData = async (newPlantObj: IPlantData) => {
    const { data } = await axios.post('/plantapi/api/plants', newPlantObj, {
        withCredentials: true,
    });
    return data;
};

export function useAddPlantMutation() {
    const queryClient = useQueryClient();
    return useMutation(postPlantData, {
        onSuccess: () => {
            queryClient.invalidateQueries('plantList');
        },
    });
}

export const putPlantData = async (plantObj: IPutPlantObj) => {
    await axios.put(`/plantapi/api/plants/${plantObj.id}`, plantObj.putObj);
};

export function usePutPlantMutation() {
    const queryClient = useQueryClient();
    return useMutation(putPlantData, {
        onSuccess: () => {
            queryClient.invalidateQueries('plantList');
        },
    });
}

export const deletePlantData = async (id: number) => {
    await axios.delete(`/plantapi/api/plants/${id}`);
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

export const postLogoutData = async () => {
    await axios.post('/plantapi/api/auth/logout').then(() => {
        localStorage.setItem('access', '');
        localStorage.setItem('userId', '');
        axios.defaults.headers.common['Authorization'] = '';
    });
};

export const postRegisterData = async (registerData: IRegisterUserPostData) => {
    await axios.post('/plantapi/api/auth/register', registerData, {
        withCredentials: true,
    });
};
