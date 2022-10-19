import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

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

export function useDeletePlantMutation() {
    const queryClient = useQueryClient();
    return useMutation(deletePlantData, {
        onSuccess: () => {
            queryClient.invalidateQueries('plantList');
        },
    });
}
