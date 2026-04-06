import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';
import { getToken } from '../utils/TokenStorage';

export interface RequestConfig {
    headers?: Record<string, string>;
    timeout?: number;
}

export interface HttpResponse<T = any> {
    data: T;
    status: number;
}

interface InternalConfig {
    url: string;
    method: string;
    headers: Record<string, string>;
    body?: string;
    timeout: number;
}

type RequestInterceptor = (config: InternalConfig) => Promise<InternalConfig>;
type ResponseInterceptorSuccess<T> = (response: HttpResponse<T>) => HttpResponse<T>;
type ResponseInterceptorError = (error: any) => Promise<never>;

class FetchClient {
    private baseURL: string;
    private defaultTimeout: number;
    private defaultHeaders: Record<string, string>;
    private requestInterceptorList: RequestInterceptor[] = [];
    private responseInterceptorList: { success: ResponseInterceptorSuccess<any>; error: ResponseInterceptorError }[] = [];

    interceptors = {
        request: {
            use: (fn: RequestInterceptor) => {
                this.requestInterceptorList.push(fn);
            },
        },
        response: {
            use: (
                success: ResponseInterceptorSuccess<any>,
                error: ResponseInterceptorError,
            ) => {
                this.responseInterceptorList.push({ success, error });
            },
        },
    };

    constructor(
        baseURL: string,
        timeout: number = 15000,
        headers: Record<string, string> = {},
    ) {
        this.baseURL = baseURL;
        this.defaultTimeout = timeout;
        this.defaultHeaders = headers;
    }

    private async request<T>(
        method: string,
        url: string,
        body?: any,
        config?: RequestConfig,
    ): Promise<HttpResponse<T>> {
        let internalConfig: InternalConfig = {
            url: url.startsWith('http') ? url : `${this.baseURL}${url}`,
            method,
            headers: { ...this.defaultHeaders, ...(config?.headers ?? {}) },
            body: body !== undefined ? JSON.stringify(body) : undefined,
            timeout: config?.timeout ?? this.defaultTimeout,
        };

        for (const interceptor of this.requestInterceptorList) {
            internalConfig = await interceptor(internalConfig);
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), internalConfig.timeout);

        try {
            const fetchResponse = await fetch(internalConfig.url, {
                method: internalConfig.method,
                headers: internalConfig.headers,
                body: internalConfig.body,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!fetchResponse.ok) {
                const httpError: any = new Error(
                    `HTTP error! status: ${fetchResponse.status}`,
                );
                httpError.response = { status: fetchResponse.status };
                let chainedError = httpError;
                for (const interceptor of this.responseInterceptorList) {
                    chainedError = await interceptor.error(chainedError).catch((e: any) => { throw e; });
                }
                throw chainedError;
            }

            const contentType = fetchResponse.headers.get('content-type');
            let data: T;
            if (contentType && contentType.includes('application/json')) {
                data = await fetchResponse.json();
            } else {
                data = (await fetchResponse.text()) as unknown as T;
            }

            let response: HttpResponse<T> = { data, status: fetchResponse.status };
            for (const interceptor of this.responseInterceptorList) {
                response = interceptor.success(response) as HttpResponse<T>;
            }

            return response;
        } catch (error: any) {
            clearTimeout(timeoutId);
            let chainedError = error;
            for (const interceptor of this.responseInterceptorList) {
                chainedError = await interceptor.error(chainedError).catch((e: any) => { throw e; });
            }
            throw chainedError;
        }
    }

    async get<T = any>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
        return this.request<T>('GET', url, undefined, config);
    }

    async post<T = any>(url: string, body?: any, config?: RequestConfig): Promise<HttpResponse<T>> {
        return this.request<T>('POST', url, body, config);
    }

    async put<T = any>(url: string, body?: any, config?: RequestConfig): Promise<HttpResponse<T>> {
        return this.request<T>('PUT', url, body, config);
    }

    async patch<T = any>(url: string, body?: any, config?: RequestConfig): Promise<HttpResponse<T>> {
        return this.request<T>('PATCH', url, body, config);
    }

    async delete<T = any>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
        return this.request<T>('DELETE', url, undefined, config);
    }
}

const createFetchInstance = (baseURL: string): FetchClient => {
    const api = new FetchClient(baseURL, 15000, {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    });

    api.interceptors.request.use(async (config) => {
        try {
            const netInfo = await NetInfo.fetch();

            if (!netInfo.isConnected) {
                Alert.alert(
                    'Error de Red',
                    'No hay conexión a Internet. Por favor, verifica tu conexión.',
                    [{ text: 'OK' }],
                );
                return Promise.reject(new Error('No hay conexión a Internet'));
            }

            const token = await getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        } catch (error) {
            console.error('Error en interceptor:', error);
            return Promise.reject(error);
        }
    });

    api.interceptors.response.use(
        response => response,
        error => {
            if (!error.response) {
                Alert.alert(
                    'Error de Conexión',
                    'No se pudo conectar con el servidor. Por favor, verifica tu conexión.',
                    [{ text: 'OK' }],
                );
            }
            return Promise.reject(error);
        },
    );

    return api;
};

export default createFetchInstance;
