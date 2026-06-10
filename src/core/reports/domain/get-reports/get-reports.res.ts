import type { IModule } from "@/core/modules/domain/get-modules/get-modules.res"

export interface IReport {
  _id: string
  name: string
  description: string
  url: string
  /** Puede llegar como ObjectId string o como objeto poblado */
  module: string | IModule
  createdAt?: string
  updatedAt?: string
}

export interface IGetReportsRes {
  reports: IReport[]
  total: number
  page: number
  limit: number
  totalPages: number
}
