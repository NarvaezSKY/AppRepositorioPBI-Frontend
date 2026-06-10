import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@heroui/react";
import { ArrowUpRight } from "lucide-react";
import { useAuth } from "../context/auth-context";
import { getModuleIcon } from "@/presentation/icons/module-icons";
import { useCatalogStore } from "@/store/catalog-store";

export function ModulesPage() {
  const { user } = useAuth();
  const modules = useCatalogStore((state) => state.modules);
  const modulesLoaded = useCatalogStore((state) => state.modulesLoaded);
  const isLoadingModules = useCatalogStore((state) => state.isLoadingModules);
  const error = useCatalogStore((state) => state.error);
  const loadModules = useCatalogStore((state) => state.loadModules);

  useEffect(() => {
    if (!modulesLoaded) {
      void loadModules();
    }
  }, [loadModules, modulesLoaded]);

  return (
    <div>
      <header className="mb-8">
        <p className="text-sm font-medium text-[var(--sena-green)]">
          Hola, {user?.username?.split(" ")[0]}
        </p>
        <h1 className="mt-1 text-balance text-3xl font-extrabold tracking-tight">
          Módulos de gestión
        </h1>
        <p className="mt-2 max-w-2xl text-pretty text-muted">
          Selecciona un módulo para ver los reportes de Power BI disponibles.
        </p>
      </header>

      {error && (
        <p className="mb-4 rounded-lg bg-[var(--danger)]/10 px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}

      {isLoadingModules && modules.length === 0 ? (
        <p className="text-sm text-muted">Cargando módulos...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => {
            const Icon = getModuleIcon(mod.id);
            return (
              <Link
                key={mod.id}
                to={`/modulos/${mod.id}`}
                className="group rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--sena-green)]"
              >
                <Card className="h-full border border-border transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-[var(--sena-green)]/50 group-hover:shadow-lg">
                  <Card.Content className="flex h-full flex-col gap-4 p-5">
                    <div className="flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--sena-green)]/12 text-[var(--sena-green)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-muted transition-colors group-hover:text-[var(--sena-green)]" />
                    </div>

                    <div className="flex-1">
                      <h2 className="text-lg font-bold tracking-tight">
                        {mod.title}
                      </h2>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {mod.description}
                      </p>
                    </div>

                    <span className="inline-flex w-fit items-center rounded-full bg-surface-secondary px-2.5 py-1 text-xs font-medium text-muted">
                      {mod.reportCount}{" "}
                      {mod.reportCount === 1 ? "reporte" : "reportes"}
                    </span>
                  </Card.Content>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
