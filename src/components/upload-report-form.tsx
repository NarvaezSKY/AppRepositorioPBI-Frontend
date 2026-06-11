import { useForm } from "react-hook-form"
import { useCatalogStore } from "@/store/catalog-store"
import type { IPostReportReq } from "@/core/reports/domain/upload-report"

interface Props {
  moduleId: string
  onSuccess: () => void
}

export function UploadReportForm({ moduleId, onSuccess }: Props) {
  const uploadReport = useCatalogStore((state) => state.uploadReport)
  const isLoading = useCatalogStore((state) => state.isLoadingReports)
  const storeError = useCatalogStore((state) => state.error)
  const clearError = useCatalogStore((state) => state.clearError)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPostReportReq>({
    defaultValues: { name: "", description: "", url: "", module: moduleId },
  })

  const onSubmit = async (data: IPostReportReq) => {
    clearError()
    await uploadReport({ ...data, module: moduleId })
    if (!useCatalogStore.getState().error) {
      reset()
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground" htmlFor="rep-name">
          Nombre <span className="text-[var(--danger)]">*</span>
        </label>
        <input
          id="rep-name"
          type="text"
          placeholder="Ej. Reporte Mensual de Ventas"
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
        <label className="text-sm font-medium text-foreground" htmlFor="rep-desc">
          Descripción <span className="text-[var(--danger)]">*</span>
        </label>
        <textarea
          id="rep-desc"
          rows={3}
          placeholder="Breve descripción del reporte"
          className={`w-full resize-none rounded-xl border bg-surface-secondary px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-[var(--sena-green)] focus:ring-1 focus:ring-[var(--sena-green)] ${
            errors.description ? "border-[var(--danger)]" : "border-border"
          }`}
          {...register("description", { required: "La descripción es obligatoria" })}
        />
        {errors.description && (
          <p className="text-xs text-[var(--danger)]">{errors.description.message}</p>
        )}
      </div>

      {/* URL */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground" htmlFor="rep-url">
          URL del reporte <span className="text-[var(--danger)]">*</span>
        </label>
        <input
          id="rep-url"
          type="url"
          placeholder="https://app.powerbi.com/..."
          className={`w-full rounded-xl border bg-surface-secondary px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-[var(--sena-green)] focus:ring-1 focus:ring-[var(--sena-green)] ${
            errors.url ? "border-[var(--danger)]" : "border-border"
          }`}
          {...register("url", {
            required: "La URL es obligatoria",
            pattern: {
              value: /^https?:\/\/.+/,
              message: "Debe ser una URL válida (https://...)",
            },
          })}
        />
        {errors.url && (
          <p className="text-xs text-[var(--danger)]">{errors.url.message}</p>
        )}
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
          {isLoading ? "Guardando…" : "Subir reporte"}
        </button>
      </div>
    </form>
  )
}
