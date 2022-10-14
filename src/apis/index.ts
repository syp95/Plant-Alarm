import axios from 'axios';

export interface IUserObj {
    createdAt: string;
    id: number;
    updatedAt: string;
    userid: string;
    username: string;
    userpassword: string;
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
