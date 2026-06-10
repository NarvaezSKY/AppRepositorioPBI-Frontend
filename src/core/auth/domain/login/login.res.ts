export type UserRole = "admin" | "gfpi"

export interface ILoginUserDto {
  _id: string
  username: string
  email: string
  role: UserRole
  createdAt?: string
  updatedAt?: string
}

export interface ILoginRes {
  user: ILoginUserDto
  token: string
}
