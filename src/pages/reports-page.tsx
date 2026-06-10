import { useEffect } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { Card } from "@heroui/react"
import { ArrowUpRight, ExternalLink, FileBarChart } from "lucide-react"
import { Breadcrumbs } from "../components/breadcrumbs"
import { getModuleIcon } from "@/presentation/icons/module-icons"
import { useCatalogStore } from "@/store/catalog-store"

export function ReportsPage() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const modules = useCatalogStore((state) => state.modules)
  const modulesLoaded = useCatalogStore((state) => state.modulesLoaded)
  const reportsByModule = useCatalogStore((state) => state.reportsByModule)
  const reportsLoadedByModule = useCatalogStore((state) => state.reportsLoadedByModule)
  const isLoadingModules = useCatalogStore((state) => state.isLoadingModules)
  const isLoadingReports = useCatalogStore((state) => state.isLoadingReports)
  const error = useCatalogStore((state) => state.error)
  const loadModules = useCatalogStore((state) => state.loadModules)
  const loadReportsByModule = useCatalogStore((state) => state.loadReportsByModule)

  useEffect(() => {
    if (!modulesLoaded) {
      void loadModules()
    }
  }, [loadModules, modulesLoaded])

  useEffect(() => {
    if (moduleId && !reportsLoadedByModule[moduleId]) {
      void loadReportsByModule(moduleId)
    }
  }, [loadReportsByModule, moduleId, reportsLoadedByModule])

  if (!moduleId) return <Navigate to="/modulos" replace />

  const mod = modules.find((item) => item.id === moduleId)

  if (modulesLoaded && !mod) return <Navigate to="/modulos" replace />

  if (!mod) {
    return <p className="text-sm text-muted">Cargando módulo...</p>
  }

  const Icon = getModuleIcon(mod.id)
  const moduleReports = reportsByModule[mod.id] ?? []

  return (
    <div>
      <Breadcrumbs items={[{ label: "Módulos", to: "/modulos" }, { label: mod.title }]} />

      <header className="mb-8 flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--sena-green)]/12 text-[var(--sena-green)]">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-balance text-3xl font-extrabold tracking-tight">
            {mod.title}
          </h1>
          <p className="mt-2 max-w-2xl text-pretty text-muted">{mod.description}</p>
        </div>
      </header>

      {error && (
        <p className="mb-4 rounded-lg bg-[var(--danger)]/10 px-3 py-2 text-sm text-[var(--danger)]">
          {error}
        </p>
      )}

      {(isLoadingModules || isLoadingReports) && moduleReports.length === 0 ? (
        <p className="text-sm text-muted">Cargando reportes...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {moduleReports.map((report) => (
            <Link
              key={report.id}
              to={`/modulos/${mod.id}/reportes/${report.id}`}
              className="group rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--sena-green)]"
            >
              <Card className="h-full border border-border transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-[var(--sena-green)]/50 group-hover:shadow-lg">
                <Card.Content className="flex h-full items-start gap-4 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-secondary text-[var(--sena-green)]">
                    <FileBarChart className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-base font-bold tracking-tight">
                        {report.title}
                      </h2>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-[var(--sena-green)]" />
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {report.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-muted">
                      <ExternalLink className="h-3.5 w-3.5" />
                      Power BI
                    </span>
                  </div>
                </Card.Content>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
