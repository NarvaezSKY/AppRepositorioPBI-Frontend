import {
  BarChart3,
  GraduationCap,
  Users,
  Wallet,
  Boxes,
  ClipboardCheck,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface ReportItem {
  id: string
  moduleId: string
  title: string
  description: string
  url: string
}

export interface ModuleItem {
  id: string
  title: string
  description: string
  icon: LucideIcon
  reportCount: number
}

export const modules: ModuleItem[] = [
  {
    id: "formacion",
    title: "Formación Profesional",
    description:
      "Indicadores de aprendices, programas, deserción y cobertura de formación titulada y complementaria.",
    icon: GraduationCap,
    reportCount: 3,
  },
  {
    id: "talento-humano",
    title: "Talento Humano",
    description:
      "Planta de personal, contratación, novedades y distribución de funcionarios por regional.",
    icon: Users,
    reportCount: 2,
  },
  {
    id: "financiera",
    title: "Gestión Financiera",
    description:
      "Ejecución presupuestal, recaudo, contratos y seguimiento a la inversión institucional.",
    icon: Wallet,
    reportCount: 2,
  },
  {
    id: "recursos",
    title: "Recursos e Inventario",
    description:
      "Control de bienes, ambientes de formación, equipos y dotación por centro de formación.",
    icon: Boxes,
    reportCount: 1,
  },
  {
    id: "evaluacion",
    title: "Evaluación y Calidad",
    description:
      "Resultados de evaluación, satisfacción del aprendiz y seguimiento a planes de mejoramiento.",
    icon: ClipboardCheck,
    reportCount: 2,
  },
  {
    id: "egresados",
    title: "Egresados y Empleabilidad",
    description:
      "Trayectoria de egresados, vinculación laboral y articulación con el sector productivo.",
    icon: BarChart3,
    reportCount: 1,
  },
]

// Sample public Power BI embed URL used as placeholder for every report.
const SAMPLE_EMBED =
  "https://app.powerbi.com/view?r=eyJrIjoiMzQ2ZTU1MmEtMWE2MC00NjVjLWE0NTAtMWRhYjBmYjA0ZmFjIiwidCI6IjlmZGM0NzMzLTAzNjAtNDVlMy05ZjQ5LTc4NjBlNjBkYmE4MiIsImMiOjR9"

export const reports: ReportItem[] = [
  {
    id: "aprendices-activos",
    moduleId: "formacion",
    title: "Aprendices Activos",
    description: "Matrícula vigente por programa, nivel de formación y regional.",
    url: SAMPLE_EMBED,
  },
  {
    id: "desercion",
    moduleId: "formacion",
    title: "Análisis de Deserción",
    description: "Tasas de deserción y retención por trimestre y centro de formación.",
    url: SAMPLE_EMBED,
  },
  {
    id: "cobertura",
    moduleId: "formacion",
    title: "Cobertura de Formación",
    description: "Cupos ofertados frente a metas institucionales por regional.",
    url: SAMPLE_EMBED,
  },
  {
    id: "planta-personal",
    moduleId: "talento-humano",
    title: "Planta de Personal",
    description: "Distribución de funcionarios por tipo de vinculación y dependencia.",
    url: SAMPLE_EMBED,
  },
  {
    id: "novedades-th",
    moduleId: "talento-humano",
    title: "Novedades de Personal",
    description: "Ingresos, retiros y movimientos de personal del periodo.",
    url: SAMPLE_EMBED,
  },
  {
    id: "ejecucion-presupuestal",
    moduleId: "financiera",
    title: "Ejecución Presupuestal",
    description: "Comportamiento del presupuesto comprometido, obligado y pagado.",
    url: SAMPLE_EMBED,
  },
  {
    id: "contratacion",
    moduleId: "financiera",
    title: "Seguimiento a Contratación",
    description: "Estado y modalidad de los procesos contractuales vigentes.",
    url: SAMPLE_EMBED,
  },
  {
    id: "inventario-bienes",
    moduleId: "recursos",
    title: "Inventario de Bienes",
    description: "Control de activos, equipos y dotación por centro de formación.",
    url: SAMPLE_EMBED,
  },
  {
    id: "resultados-evaluacion",
    moduleId: "evaluacion",
    title: "Resultados de Evaluación",
    description: "Desempeño por competencia, programa y ambiente de formación.",
    url: SAMPLE_EMBED,
  },
  {
    id: "satisfaccion",
    moduleId: "evaluacion",
    title: "Satisfacción del Aprendiz",
    description: "Encuestas de percepción y calidad del servicio de formación.",
    url: SAMPLE_EMBED,
  },
  {
    id: "empleabilidad",
    moduleId: "egresados",
    title: "Empleabilidad de Egresados",
    description: "Vinculación laboral y articulación con el sector productivo.",
    url: SAMPLE_EMBED,
  },
]

export function getModule(moduleId: string): ModuleItem | undefined {
  return modules.find((m) => m.id === moduleId)
}

export function getReportsByModule(moduleId: string): ReportItem[] {
  return reports.filter((r) => r.moduleId === moduleId)
}

export function getReport(reportId: string): ReportItem | undefined {
  return reports.find((r) => r.id === reportId)
}
