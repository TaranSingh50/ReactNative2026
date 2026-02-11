import apiClient from "./client";
import { LoginRequest, LoginResponse } from "../types/api";
import { CancelToken } from "axios";
import { axiosClient } from "./axiosClient";

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  password: string;
};

type RegisterResponse = {
  id: number;
};

export const registerUser = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const response = await apiClient.post<RegisterResponse>(
    '/posts', 
    payload
  );

  return response.data;
};


export const loginApi = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const response = await axiosClient.post<LoginResponse>(
    '/auth/login',
    data
  )

  // ✅ Return only pure data
  return response.data
}