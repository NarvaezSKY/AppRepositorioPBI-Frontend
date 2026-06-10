import type { IGetReportsRes, IReport } from "./get-reports/get-reports.res"

export interface IReportsRepository {
  getReports: (params?: { page?: number; limit?: number }) => Promise<IGetReportsRes>
  getReportById: (id: string) => Promise<IReport>
}
