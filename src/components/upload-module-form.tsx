import { useForm } from "react-hook-form"
import { useCatalogStore } from "@/store/catalog-store"
import type { IPostModuleReq } from "@/core/modules/domain/upload-modules"

const ROLE_OPTIONS = ["admin", "viewer", "editor"] as const

interface Props {
  onSuccess: () => void
}

export function UploadModuleForm({ onSuccess }: Props) {
  const uploadModule = useCatalogStore((state) => state.uploadModule)
  const isLoading = useCatalogStore((state) => state.isLoadingModules)
  const storeError = useCatalogStore((state) => state.error)
  const clearError = useCatalogStore((state) => state.clearError)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPostModuleReq>({
    defaultValues: { name: "", description: "", visibleToRoles: [] },
  })

  const onSubmit = async (data: IPostModuleReq) => {
    clearError()
    await uploadModule(data)
    // Only close if no store error was set
    if (!useCatalogStore.getState().error) {
      reset()
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground" htmlFor="mod-name">
          Nombre <span className="text-[var(--danger)]">*</span>
        </label>
        <input
          id="mod-name"
          type="text"
          placeholder="Ej. Gestión de Inventarios"
          className={`w-full rounded-xl border bg-surface-secondary px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-[var(--sena-green)] focus:ring-1 focus:ring-[var(--sena-green)] ${
            errors.name ? "border-[var(--danger)]" : "border-border"
          }`}
          {...register("name", { required: "El nombre es obligatorio" })}
        />
        {errors.name && (
          <p className="text-xs text-[var(--danger)]">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground" htmlFor="mod-desc">
          Descripción <span className="text-[var(--danger)]">*</span>
        </label>
        <textarea
          id="mod-desc"
          rows={3}
          placeholder="Breve descripción del módulo"
          className={`w-full resize-none rounded-xl border bg-surface-secondary px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-[var(--sena-green)] focus:ring-1 focus:ring-[var(--sena-green)] ${
            errors.description ? "border-[var(--danger)]" : "border-border"
          }`}
          {...register("description", { required: "La descripción es obligatoria" })}
        />
        {errors.description && (
          <p className="text-xs text-[var(--danger)]">{errors.description.message}</p>
        )}
      </div>

      {/* Visible to roles */}
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-foreground">Roles con acceso</span>
        <div className="flex flex-wrap gap-3">
          {ROLE_OPTIONS.map((role) => (
            <label key={role} className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                value={role}
                className="h-4 w-4 rounded border-border accent-[var(--sena-green)]"
                {...register("visibleToRoles")}
              />
              <span className="text-sm text-foreground capitalize">{role}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Store-level error */}
      {storeError && (
        <p className="rounded-lg bg-[var(--danger)]/10 px-3 py-2 text-sm text-[var(--danger)]">
          {storeError}
        </p>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-1">
        <button
          type="button"
          onClick={() => { reset(); clearError() }}
          className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-secondary"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-[var(--sena-green)] px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-60 hover:opacity-90"
        >
          {isLoading ? "Guardando…" : "Crear módulo"}
        </button>
      </div>
    </form>
  )
}
