import type { IGetReportsRes, IReport } from "./get-reports/get-reports.res"
import type {IPostReportReq, IPostReportRes} from './upload-report'

export interface IReportsRepository {
  getReports: (params?: { page?: number; limit?: number }) => Promise<IGetReportsRes>
  getReportById: (id: string) => Promise<IReport>
  uploadReport: (data: IPostReportReq) => Promise<IPostReportRes>
}
