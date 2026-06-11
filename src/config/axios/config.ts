export const BACKEND_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api"

  export const ROLE_OPTIONS = ["admin", "gfpi"] as const