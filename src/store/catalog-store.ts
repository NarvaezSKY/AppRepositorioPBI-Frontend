import { create } from "zustand"
import {
  getModulesUseCase,
} from "@/core/modules/application/modules.use-cases"
import { modulesRepository } from "@/core/modules/infrastructure/modules.repository"
import {
  getReportsUseCase,
  getReportByIdUseCase,
} from "@/core/reports/application/reports.use-cases"
import { reportsRepository } from "@/core/reports/infrastructure/reports.repository"
import type { IModule } from "@/core/modules/domain/get-modules/get-modules.res"
import type { IReport } from "@/core/reports/domain/get-reports/get-reports.res"
import { getErrorMessage } from "@/core/shared/errors/get-error-message"

// ── View models (mapeados desde los DTOs del backend) ───────────────────────
export interface Module {
  id: string
  title: string
  description: string
  visibleToRoles?: string[]
  reportCount: number
}

export interface Report {
  id: string
  moduleId: string
  title: string
  description: string
  url: string
}

// ── Mappers ─────────────────────────────────────────────────────────────────
function toModule(dto: IModule): Module {
  return {
    id: dto._id,
    title: dto.name,
    description: dto.description,
    visibleToRoles: dto.visibleToRoles,
    reportCount: dto.reportCount ?? 0,
  }
}

function resolveModuleId(module: IReport["module"]): string {
  return typeof module === "string" ? module : module._id
}

function toReport(dto: IReport): Report {
  return {
    id: dto._id,
    moduleId: resolveModuleId(dto.module),
    title: dto.name,
    description: dto.description,
    url: dto.url,
  }
}

// ── Use cases (instanciados una sola vez) ────────────────────────────────────
const getModules = getModulesUseCase(modulesRepository)
const getReports = getReportsUseCase(reportsRepository)
const getReportById = getReportByIdUseCase(reportsRepository)

// ── Store ────────────────────────────────────────────────────────────────────
interface CatalogState {
  modules: Module[]
  reportsByModule: Record<string, Report[]>
  reportById: Record<string, Report>
  modulesLoaded: boolean
  reportsLoadedByModule: Record<string, boolean>
  isLoadingModules: boolean
  isLoadingReports: boolean
  error: string | null
  loadModules: () => Promise<void>
  loadReportsByModule: (moduleId: string) => Promise<void>
  loadReportById: (reportId: string) => Promise<void>
  clearError: () => void
}

export const useCatalogStore = create<CatalogState>((set, get) => ({
  modules: [],
  reportsByModule: {},
  reportById: {},
  modulesLoaded: false,
  reportsLoadedByModule: {},
  isLoadingModules: false,
  isLoadingReports: false,
  error: null,

  loadModules: async () => {
    if (get().isLoadingModules) return
    set({ isLoadingModules: true, error: null })
    try {
      const res = await getModules({ limit: 100 })
      set({ modules: res.modules.map(toModule), modulesLoaded: true, isLoadingModules: false })
    } catch (error) {
      set({
        isLoadingModules: false,
        error: getErrorMessage(error, "No fue posible cargar los módulos"),
      })
    }
  },

  loadReportsByModule: async (moduleId: string) => {
    if (!moduleId || get().isLoadingReports) return
    set({ isLoadingReports: true, error: null })
    try {
      const res = await getReports({ limit: 100 })
      const reports = res.reports.map(toReport).filter((r) => r.moduleId === moduleId)

      set((state) => ({
        reportsByModule: { ...state.reportsByModule, [moduleId]: reports },
        reportById: reports.reduce<Record<string, Report>>(
          (acc, r) => ({ ...acc, [r.id]: r }),
          { ...state.reportById },
        ),
        reportsLoadedByModule: { ...state.reportsLoadedByModule, [moduleId]: true },
        isLoadingReports: false,
      }))
    } catch (error) {
      set({
        isLoadingReports: false,
        error: getErrorMessage(error, "No fue posible cargar los reportes"),
      })
    }
  },

  loadReportById: async (reportId: string) => {
    if (!reportId || get().isLoadingReports || get().reportById[reportId]) return
    set({ isLoadingReports: true, error: null })
    try {
      const dto = await getReportById(reportId)
      const report = toReport(dto)

      set((state) => ({
        reportById: { ...state.reportById, [report.id]: report },
        reportsByModule: {
          ...state.reportsByModule,
          [report.moduleId]: [
            ...(state.reportsByModule[report.moduleId] ?? []).filter(
              (item) => item.id !== report.id,
            ),
            report,
          ],
        },
        isLoadingReports: false,
      }))
    } catch (error) {
      set({
        isLoadingReports: false,
        error: getErrorMessage(error, "No fue posible cargar el reporte"),
      })
    }
  },

  clearError: () => set({ error: null }),
}))
