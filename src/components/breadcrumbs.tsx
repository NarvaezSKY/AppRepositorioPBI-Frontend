import { Link } from "react-router-dom"
import { ChevronRight, Home } from "lucide-react"
import { Fragment } from "react"

export interface Crumb {
  label: string
  to?: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Ruta de navegación" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        <li>
          <Link
            to="/modulos"
            className="flex items-center gap-1 rounded-md px-1.5 py-1 text-muted transition-colors hover:text-[var(--sena-green)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sena-green)]"
            aria-label="Inicio"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <Fragment key={`${item.label}-${index}`}>
              <li aria-hidden="true" className="text-border">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li>
                {item.to && !isLast ? (
                  <Link
                    to={item.to}
                    className="rounded-md px-1.5 py-1 text-muted transition-colors hover:text-[var(--sena-green)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sena-green)]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className="px-1.5 py-1 font-semibold text-foreground"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
