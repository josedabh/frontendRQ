import axios from "axios";

import { getToken } from "../../shared/utils/TokenStorage";
import { HistoryShopping, RewardRequest, RewardResponse } from "../models/StoreData";

/** Url de la Api */
const URL = "http://vps-5060784-x.dattaweb.com:8080/api/v1/store";

const getAuthHeaders = async () => {
    const token = await getToken();
    return {
        Authorization: `Bearer ${token}`,
    };
};

/** Api Post: Creacion de una recompensa */
export const createReward = async (request: RewardRequest) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.post<RewardResponse>(
            `${URL}/create-product`,
            request,
            { headers },
        );
        return response.data;
    } catch (error) {
        console.error("Error al crear el producto:", error);
        throw error;
    }
};

/** Api Get: lista de productos para cards */
export const getListRewards = async () => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get<RewardResponse[]>(`${URL}/admin/list-rewards`, {
            headers,
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
};


/** Api Get: lista de productos para cards */
export const getListRewardsUsers = async () => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get<RewardResponse[]>(`${URL}/users/list-rewards`, {
            headers,
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
};

/** Api Get: Consigue el producto por id */
export const getRewardById = async (id: number) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get<RewardResponse>(`${URL}/reward/${id}`, {
            headers,
        });
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
        const headers = await getAuthHeaders();
        const response = await axios.put<RewardResponse>(
            `${URL}/update-reward/${id}`,
            request,
            { headers },
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
        const headers = await getAuthHeaders();
        await axios.delete(`${URL}/delete-product/${id}`, { headers });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        throw error;
    }
}

/** Api Patch: Cambia la visibility de la recompensa */
export const changeVisbilityReward = async (id: number): Promise<void> => {
    try {
        const headers = await getAuthHeaders();
        await axios.patch(`${URL}/change-visibility/${id}`, {}, { headers });
    } catch (error) {
        console.error("Error al cambiar la visibilidad del producto:", error);
        throw error;
    }
}

/** Api Post: Comprar una recompensas con puntos */
export const buyReward = async (id: number): Promise<void> => {
    try {
        const headers = await getAuthHeaders();
        await axios.post(`${URL}/buy-reward/${id}`,{}, { headers });
    } catch (error) {
        console.error("Error al comprar la recompensa:", error);
        throw error;
    }
}

/** Api Get: Lista de recompensas compradas por el usuario */
export const getListHistoryRewards = async () => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get<HistoryShopping[]>(`${URL}/admin/purchase-history`, {
            headers,
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener el historial de recompensas:", error);
        throw error;
    }
}

/** Api Get: Lista de recompensas compradas por el usuario */
export const getListHistoryRewardsUser = async () => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get<HistoryShopping[]>(`${URL}/user/purchase-history`, {
            headers,
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener el historial de recompensas del usuario:", error);
        throw error;
    }
}