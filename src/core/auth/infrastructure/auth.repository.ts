import axiosInstance from "@/config/axios/instance"
import type { IAuthRepository } from "../domain/auth.repository"
import type { ILoginReq } from "../domain/login/login.req"

const login = async (data: ILoginReq) => {
  const response = await axiosInstance.post("/users/login", data)
  return response.data
}

const logout = async () => {
  // El backend no expone endpoint de logout; la sesión se limpia localmente.
}

export const authRepository: IAuthRepository = {
  login,
  logout,
}
