export interface IModule {
  _id: string
  name: string
  description: string
  visibleToRoles?: string[]
  reportCount: number
  createdAt?: string
  updatedAt?: string
}

export interface IGetModulesRes {
  modules: IModule[]
  total: number
  page: number
  limit: number
  totalPages: number
}
