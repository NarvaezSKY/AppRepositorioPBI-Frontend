import type { ILoginReq } from "./login/login.req"
import type { ILoginRes } from "./login/login.res"

export interface IAuthRepository {
  login: (data: ILoginReq) => Promise<ILoginRes>
  logout: () => Promise<void>
}
