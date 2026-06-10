import { Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "./context/auth-context"
import { AppLayout } from "./components/app-layout"
import { LoginPage } from "./pages/login-page"
import { ModulesPage } from "./pages/modules-page"
import { ReportsPage } from "./pages/reports-page"
import { ReportViewerPage } from "./pages/report-viewer-page"
import type { ReactNode } from "react"

function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/modulos" replace /> : <LoginPage />}
      />
      <Route
        element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }
      >
        <Route path="/modulos" element={<ModulesPage />} />
        <Route path="/modulos/:moduleId" element={<ReportsPage />} />
        <Route
          path="/modulos/:moduleId/reportes/:reportId"
          element={<ReportViewerPage />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/modulos" replace />} />
    </Routes>
  )
}
