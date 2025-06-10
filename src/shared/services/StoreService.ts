import createAxiosInstance from '../config/axios.config';

import { HistoryShopping, RewardRequest, RewardResponse } from "../models/StoreData";

/** Url de la Api */
const BASE_URL = "http://vps-5060784-x.dattaweb.com:8080/api/v1/store";
const api = createAxiosInstance(BASE_URL);

/** Api Post: Creacion de una recompensa */
export const createReward = async (request: RewardRequest) => {
    try {
        const response = await api.post<RewardResponse>('/create-product', request);
        return response.data;
    } catch (error) {
        console.error("Error al crear el producto:", error);
        throw error;
    }
};

/** Api Get: lista de productos para cards */
export const getListRewards = async () => {
    try {
        const response = await api.get<RewardResponse[]>('/admin/list-rewards');
        return response.data;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
};


/** Api Get: lista de productos para cards */
export const getListRewardsUsers = async () => {
    try {
        const response = await api.get<RewardResponse[]>('/users/list-rewards');
        return response.data;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
};

/** Api Get: Consigue el producto por id */
export const getRewardById = async (id: number) => {
    try {
        const response = await api.get<RewardResponse>(`/reward/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el reward:", error);
        throw error;
    }
};

/** Api Put: Actualiza el producto */
export const updateReward = async (
    id: number,
    request: RewardRequest,
): Promise<RewardResponse> => {
    try {
        const response = await api.put<RewardResponse>(
            `/update-reward/${id}`,
            request,
        );
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        throw error;
    }
};
/** Api Delete: Elimina el producto */
export const deleteReward = async (id: number): Promise<void> => {
    try {
        await api.delete(`/delete-product/${id}`);
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        throw error;
    }
}

/** Api Patch: Cambia la visibility de la recompensa */
export const changeVisbilityReward = async (id: number): Promise<void> => {
    try {
        await api.patch(`/change-visibility/${id}`);
    } catch (error) {
        console.error("Error al cambiar la visibilidad del producto:", error);
        throw error;
    }
}

/** Api Post: Comprar una recompensas con puntos */
export const buyReward = async (id: number): Promise<void> => {
    try {
        await api.post(`/buy-reward/${id}`);
    } catch (error) {
        console.error("Error al comprar la recompensa:", error);
        throw error;
    }
}

/** Api Get: Lista de recompensas compradas por el usuario */
export const getListHistoryRewards = async () => {
    try {
        const response = await api.get<HistoryShopping[]>('/admin/purchase-history');
        return response.data;
    } catch (error) {
        console.error("Error al obtener el historial de recompensas:", error);
        throw error;
    }
}

/** Api Get: Lista de recompensas compradas por el usuario */
export const getListHistoryRewardsUser = async () => {
    try {
        const response = await api.get<HistoryShopping[]>('/user/purchase-history');
        return response.data;
    } catch (error) {
        console.error("Error al obtener el historial de recompensas del usuario:", error);
        throw error;
    }
}