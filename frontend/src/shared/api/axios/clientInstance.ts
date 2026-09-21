import axios from "axios";
import type { AxiosError, AxiosRequestConfig } from "axios";
import { TErrorData } from "@/shared/model";

let isRefreshing = false;
let failedQueue: {
	resolve: (value?: unknown) => void;
	reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

const createClientApi = ({ baseURL, accessToken}: TCreateClientApi) => {
	const instance = axios.create({
		baseURL,
		withCredentials: true,
        headers: {
            Authorization: accessToken
        }
	});

	createInterceptor();

	function createInterceptor() {
		instance.interceptors.response.use(
			(response) => response,
			async (error: AxiosError<TErrorData>) => {
				const originalRequest = error.config as AxiosRequestConfig & { _retry: boolean };

				if (error.response?.status === 401 && !originalRequest._retry) {
					if (isRefreshing) {
						// Если уже идёт обновление токена — ставим запрос в очередь
						return new Promise((resolve, reject) => {
							failedQueue.push({ resolve, reject });
						})
							.then((token) => {
								originalRequest.headers!.Authorization = token;
								return instance(originalRequest);
							})
							.catch((err) => {
								return Promise.reject(err);
							});
					}

					originalRequest._retry = true;
					isRefreshing = true;

					try {
						// Обновить удалось
						const new_access_token = ((await instance.post("/api/auth/refresh")).data).access_token;

						// Обновляем заголовок для всех последующих запросов
						instance.defaults.headers.common["Authorization"] = new_access_token;

						// Разрешаем все запросы в очереди
						processQueue(null, new_access_token);

						// Повторяем оригинальный запрос с новым токеном
						originalRequest.headers!.Authorization = new_access_token;
						return instance(originalRequest);
					} catch (refreshError) {
						// Обновить НЕ удалось
						processQueue(refreshError as AxiosError, null);

						await instance.post("/api/auth/logout")

						// Редирект на авторизацию
						if (typeof window !== "undefined") {
							window.location.href = '/auth'
						}

						return Promise.reject(refreshError);
					} finally {
						isRefreshing = false;
					}
				}

				return Promise.reject(error);
			}
		);
	}

	return instance
};

export { createClientApi }

type TCreateClientApi = {
    baseURL: string | undefined,
    accessToken: string | undefined
}