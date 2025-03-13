import { API_BASE_URL } from "@/constants";
import type { CallApiType } from "@/types/http.interface";
import type { AxiosResponse, AxiosRequestConfig } from "axios";

import axios from "axios";

const httpService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpService.interceptors.response.use(
  (res) => res,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "مشکلی پیش آمده !!"
    )
);

export { httpService };

async function apiBase<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse = await httpService(url, options);

  return response.data as T;
}

async function callApi<TPayload, TResponse>({
  url,
  method,
  data,
  params,
}: CallApiType<TPayload>): Promise<TResponse> {
  const options: AxiosRequestConfig = {
    method,
    data: data ? JSON.stringify(data) : undefined,
    params,
  };

  return await apiBase<TResponse>(url, options);
}
export { callApi };
