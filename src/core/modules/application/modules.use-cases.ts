import type { IModulesRepository } from "../domain/modules.repository"

export const getModulesUseCase = (repository: IModulesRepository) => {
  return repository.getModules
}

export const getModuleByIdUseCase = (repository: IModulesRepository) => {
  return repository.getModuleById
}
