import axiosInstance from "@/config/axios/instance"
import type { IModulesRepository } from "../domain/modules.repository"

const getModules: IModulesRepository["getModules"] = async (params = { limit: 100 }) => {
  const response = await axiosInstance.get("/modules", { params })
  return response.data
}

const getModuleById: IModulesRepository["getModuleById"] = async (id) => {
  const response = await axiosInstance.get(`/modules/${id}`)
  return response.data
}

const uploadModule: IModulesRepository["uploadModule"] = async (data) => {
  const response = await axiosInstance.post("/modules/create", data)
  return response.data
}

export const modulesRepository: IModulesRepository = {
  getModules,
  getModuleById,
  uploadModule
}
