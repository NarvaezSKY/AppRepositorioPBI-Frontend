import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { Button } from "@heroui/react"
import { ExternalLink, Loader2, Maximize2, RefreshCw } from "lucide-react"
import { Breadcrumbs } from "../components/breadcrumbs"
import { useCatalogStore } from "@/store/catalog-store"

export function ReportViewerPage() {
  const { moduleId, reportId } = useParams<{
    moduleId: string
    reportId: string
  }>()

  const modules = useCatalogStore((state) => state.modules)
  const modulesLoaded = useCatalogStore((state) => state.modulesLoaded)
  const reportById = useCatalogStore((state) => state.reportById)
  const isLoadingModules = useCatalogStore((state) => state.isLoadingModules)
  const isLoadingReports = useCatalogStore((state) => state.isLoadingReports)
  const error = useCatalogStore((state) => state.error)
  const loadModules = useCatalogStore((state) => state.loadModules)
  const loadReportById = useCatalogStore((state) => state.loadReportById)

  useEffect(() => {
    if (!modulesLoaded) {
      void loadModules()
    }
  }, [loadModules, modulesLoaded])

  useEffect(() => {
    if (reportId) {
      void loadReportById(reportId)
    }
  }, [loadReportById, reportId])

  const mod = moduleId ? modules.find((item) => item.id === moduleId) : undefined
  const report = reportId ? reportById[reportId] : undefined

  const [loading, setLoading] = useState(true)
  const [reloadKey, setReloadKey] = useState(0)

  if (!moduleId || !reportId) {
    return <Navigate to="/modulos" replace />
  }

  if ((isLoadingModules || isLoadingReports) && (!mod || !report)) {
    return <p className="text-sm text-muted">Cargando reporte...</p>
  }

  if (!mod || !report || report.moduleId !== mod.id) {
    if (modulesLoaded) {
      return <Navigate to="/modulos" replace />
    }
    return <p className="text-sm text-muted">Cargando módulo...</p>
  }

  const handleReload = () => {
    setLoading(true)
    setReloadKey((k) => k + 1)
  }

  const openFullscreen = () => {
    const frame = document.getElementById("report-frame")
    frame?.requestFullscreen?.()
  }

  return (
    <div className="flex flex-col">
      <Breadcrumbs
        items={[
          { label: "Módulos", to: "/modulos" },
          { label: mod.title, to: `/modulos/${mod.id}` },
          { label: report.title },
        ]}
      />

      {error && (
        <p className="mb-4 rounded-lg bg-[var(--danger)]/10 px-3 py-2 text-sm text-[var(--danger)]">
          {error}
        </p>
      )}

      <header className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-balance text-2xl font-extrabold tracking-tight sm:text-3xl">
            {report.title}
          </h1>
          <p className="mt-1.5 max-w-2xl text-pretty text-sm text-muted">
            {report.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReload} className="gap-1.5">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Recargar</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={openFullscreen}
            className="gap-1.5"
          >
            <Maximize2 className="h-4 w-4" />
            <span className="hidden sm:inline">Pantalla completa</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => window.open(report.url, "_blank", "noopener,noreferrer")}
            className="gap-1.5"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">Abrir</span>
          </Button>
        </div>
      </header>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-surface">
            <Loader2 className="h-7 w-7 animate-spin text-[var(--sena-green)]" />
            <p className="text-sm text-muted">Cargando reporte…</p>
          </div>
        )}
        <iframe
          id="report-frame"
          key={reloadKey}
          title={report.title}
          src={report.url}
          onLoad={() => setLoading(false)}
          allowFullScreen
          className="h-[70vh] min-h-[480px] w-full border-0"
        />
      </div>

      <p className="mt-3 text-xs text-muted">
        Reporte servido desde Power BI. Si no carga, verifica que el enlace esté
        publicado y que cuentes con los permisos requeridos.
      </p>
    </div>
  )
}
