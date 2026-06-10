import type { IReportsRepository } from "../domain/reports.repository"

export const getReportsUseCase = (repository: IReportsRepository) => {
  return repository.getReports
}

export const getReportByIdUseCase = (repository: IReportsRepository) => {
  return repository.getReportById
}
