import type { IModule } from "./get-modules/get-modules.res"
import type { IGetModulesRes } from "./get-modules/get-modules.res"
import { IPostModuleReq, IPostModuleRes } from "./upload-modules";

export interface IModulesRepository {
  getModules: (params?: { page?: number; limit?: number }) => Promise<IGetModulesRes>
  getModuleById: (id: string) => Promise<IModule>
  uploadModule: (data: IPostModuleReq) => Promise<IPostModuleRes>
}
