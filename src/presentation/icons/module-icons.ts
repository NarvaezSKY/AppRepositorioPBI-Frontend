import {
  BarChart3,
  Boxes,
  ClipboardCheck,
  GraduationCap,
  Users,
  Wallet,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

const iconByKey: Record<string, LucideIcon> = {
  formacion: GraduationCap,
  "talento-humano": Users,
  financiera: Wallet,
  recursos: Boxes,
  evaluacion: ClipboardCheck,
  egresados: BarChart3,
}

export function getModuleIcon(iconKey?: string): LucideIcon {
  if (!iconKey) return BarChart3
  return iconByKey[iconKey] ?? BarChart3
}
