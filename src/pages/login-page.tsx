import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, InputGroup, Label, TextField } from "@heroui/react";
import { Eye, EyeOff, Loader2, LockKeyhole, Moon, Sun } from "lucide-react";
import { useAuth } from "../context/auth-context";
import { useTheme } from "../context/theme-context";
import SENABANNER from "@/assets/login-image.png";
import SENALOGO from "@/assets/logo-sena.png";
import CMRLOGO from "@/assets/logo-coord-mis-reg-white.png";

const SENA_LOGO = SENALOGO;
const SENA_BANNER = SENABANNER;
const CMR_LOGO = CMRLOGO;

export function LoginPage() {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate("/modulos", { replace: true });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No fue posible iniciar sesión",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground lg:flex-row">
      {/* Brand / visual panel */}
      <aside className="relative hidden overflow-hidden lg:flex lg:w-1/2 xl:w-3/5">
        <img
          src={SENA_BANNER}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--sena-blue)]/55" />
        <div className="relative z-10 flex flex-col justify-between p-12">
          <div className="flex items-center gap-3 backdrop-blur-sm backdrop-saturate-200 rounded-lg bg-white/30 px-3 py-2 w-md">
            <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-white/95 shadow-lg">
              <img
                src={SENA_LOGO}
                alt="Logo SENA"
                className="h-10 w-10 object-contain"
              />
            </span>
            <div className="text-white">
              <p className="text-lg font-extrabold tracking-tight">SENA</p>
              <p className="text-sm text-white/80">
                Regional Cauca
              </p>
            </div>
          </div>

          <div className="max-w-md text-white backdrop-blur-sm backdrop-saturate-200  rounded-lg bg-white/30 p-6">
            <h1 className="text-balance text-4xl font-extrabold leading-tight">
              Plataforma de Reportes Power BI
            </h1>
            <p className="mt-4 text-pretty text-base leading-relaxed text-white/85">
              Consulta los tableros e indicadores institucionales en un solo
              lugar, organizados por módulos de gestión.
            </p>
          </div>
          <div className="max-w-md text-white backdrop-blur-sm backdrop-saturate-200 rounded-lg bg-white/30 p-4 flex flex-row justify-between items-center">
            <div className="flex items-center bg-white rounded-lg px-3 py-2 gap-2">
              <img
                src={CMR_LOGO}
                alt="Logo CMR"
                className="h-18 object-contain"
              />
            </div>
            <p className="relative z-10 text-xs text-white/70">
              Acceso exclusivo para funcionarios autorizados.
            </p>
          </div>
        </div>
      </aside>

      {/* Form panel */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-end p-4">
          <Button
            isIconOnly
            variant="ghost"
            size="sm"
            aria-label={
              theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"
            }
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="h-[18px] w-[18px]" />
            ) : (
              <Moon className="h-[18px] w-[18px]" />
            )}
          </Button>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 pb-12">
          <div className="w-full max-w-sm">
            <div className="mb-8 flex flex-col items-center text-center lg:hidden">
              <img
                src={SENA_LOGO}
                alt="Logo SENA"
                className="h-16 w-16 object-contain"
              />
              <p className="mt-2 text-lg font-extrabold">SENA</p>
            </div>

            <div className="mb-8">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--sena-green)]/12 text-[var(--sena-green)]">
                <LockKeyhole className="h-5 w-5" />
              </span>
              <h2 className="text-2xl font-bold tracking-tight">
                Iniciar sesión
              </h2>
              <p className="mt-1 text-sm text-muted">
                Ingresa tus credenciales institucionales para continuar.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              noValidate
            >
              <TextField
                value={email}
                onChange={setEmail}
                type="email"
                isRequired
                className="flex flex-col gap-1.5"
              >
                <Label className="text-sm font-medium">
                  Correo institucional
                </Label>
                <Input
                  placeholder="ejem.plo@sena.edu.co"
                  autoComplete="email"
                />
              </TextField>

              <TextField
                value={password}
                onChange={setPassword}
                type={showPassword ? "text" : "password"}
                isRequired
                className="flex flex-col gap-1.5"
              >
                <Label className="text-sm font-medium">Contraseña</Label>
                <InputGroup>
                  <InputGroup.Input
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <InputGroup.Suffix>
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="rounded-md p-1 text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sena-green)]"
                      aria-label={
                        showPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </InputGroup.Suffix>
                </InputGroup>
              </TextField>

              {error && (
                <p
                  role="alert"
                  className="rounded-lg bg-[var(--danger)]/10 px-3 py-2 text-sm text-[var(--danger)]"
                >
                  {error}
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isDisabled={loading}
                className="mt-1"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Ingresando…
                  </span>
                ) : (
                  "Ingresar"
                )}
              </Button>
            </form>

            <p className="mt-8 text-center text-xs text-muted">
              Coordinación Misional Regional · SENA Regional Cauca
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
