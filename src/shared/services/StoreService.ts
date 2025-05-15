import axios from "axios";
import { RewardRequest, RewardResponse } from "../models/StoreData";
import { getToken } from "../../context/AuthContext";

/** Url de la Api */
const URL = "http://localhost:8080/api/v1/store";

const getAuthHeaders = async () => {
    const token = await getToken();
    return {
        Authorization: `Bearer ${token}`,
    };
};

export const createProduct = async (request:RewardRequest) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.post<RewardResponse>(`${URL}/admin/create-product`, request, { headers });
        return response.data;
    } catch (error) {
        console.error('Error al crear el producto:', error);
        throw error;
    }
}

export const getListProducts = async () => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get<RewardResponse[]>(`${URL}/products`, { headers });
        return response.data;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw error;
    }
}