import { Outlet, useNavigate } from "react-router-dom"
import { Button } from "@heroui/react"
import { LogOut, Moon, Sun } from "lucide-react"
import { useAuth } from "../context/auth-context"
import { useTheme } from "../context/theme-context"

const SENA_LOGO =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aJxVhrHTI2U1uNVhSPTKiyrJXAFv0S.png"

export function AppLayout() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login", { replace: true })
  }

  const initials = user?.username
    ?.split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-surface/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => navigate("/modulos")}
            className="flex items-center gap-3 rounded-lg outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[var(--sena-green)]"
            aria-label="Ir al inicio"
          >
            <img src={SENA_LOGO} alt="Logo SENA" className="h-9 w-9 object-contain" />
            <div className="hidden text-left leading-tight sm:block">
              <p className="text-sm font-bold tracking-tight">SENA</p>
              <p className="text-xs text-muted">Reportes Power BI</p>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <Button
              isIconOnly
              variant="ghost"
              size="sm"
              aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <Sun className="h-[18px] w-[18px]" />
              ) : (
                <Moon className="h-[18px] w-[18px]" />
              )}
            </Button>

            <div className="hidden items-center gap-2 sm:flex">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--sena-green)] text-xs font-bold text-white"
                aria-hidden="true"
              >
                {initials}
              </span>
              <span className="max-w-[10rem] truncate text-sm font-medium">
                {user?.username}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-1.5"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Salir</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-surface/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-4 text-center text-xs text-muted sm:px-6">
          Servicio Nacional de Aprendizaje · SENA · Regional Cauca
        </div>
      </footer>
    </div>
  )
}
