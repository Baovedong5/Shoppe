import { AuthResponse } from "src/types/auth.type";
import http from "src/utils/axiosCustomer";

export const registerAccount = (body: { email: string; password: string }) => {
  return http.post<AuthResponse>("register", body);
};

export const loginAccount = (body: { email: string; password: string }) => {
  return http.post<AuthResponse>("login", body);
};
