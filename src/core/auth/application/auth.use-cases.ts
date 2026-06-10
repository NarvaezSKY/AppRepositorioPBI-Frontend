import type { IAuthRepository } from "../domain/auth.repository"

export const loginUseCase = (repository: IAuthRepository) => {
  return repository.login
}

export const logoutUseCase = (repository: IAuthRepository) => {
  return repository.logout
}
