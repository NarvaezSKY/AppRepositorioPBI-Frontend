import axiosInstance from "@/config/axios/instance"
import type { IReportsRepository } from "../domain/reports.repository"

const getReports: IReportsRepository["getReports"] = async (params = { limit: 100 }) => {
  const response = await axiosInstance.get("/reports", { params })
  return response.data
}

const getReportById: IReportsRepository["getReportById"] = async (id) => {
  const response = await axiosInstance.get(`/reports/${id}`)
  return response.data
}

const uploadReport: IReportsRepository["uploadReport"] = async (data) => {
  const response = await axiosInstance.post("/reports", data)
  return response.data
}

export const reportsRepository: IReportsRepository = {
  getReports,
  getReportById,
  uploadReport
}
