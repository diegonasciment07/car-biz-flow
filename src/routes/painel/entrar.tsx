import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { loginPainelFn } from "./-functions";

export const Route = createFileRoute("/painel/entrar")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }, { title: "Painel" }],
  }),
  component: EntrarPainel,
});

function EntrarPainel() {
  const navigate = useNavigate();
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setEnviando(true);
    try {
      await loginPainelFn({ data: { password: senha } });
      navigate({ to: "/painel" });
    } catch {
      setErro("Senha incorreta.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form onSubmit={entrar} className="surface-panel w-full max-w-sm rounded-2xl p-6 md:p-8">
        <h1 className="text-xl text-foreground">Painel</h1>
        <p className="mt-2 text-sm text-muted-foreground">Acesso restrito.</p>
        <label className="mt-6 block">
          <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
            Senha
          </span>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoFocus
            autoComplete="current-password"
            className="h-12 w-full rounded-xl border border-input bg-navy-950/60 px-4 text-white outline-none transition focus:border-primary"
          />
        </label>
        {erro && <p className="mt-4 text-sm text-destructive">{erro}</p>}
        <button
          type="submit"
          disabled={enviando || !senha}
          className="mt-6 h-12 w-full rounded-xl bg-primary px-5 font-display text-sm uppercase tracking-wide text-primary-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {enviando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
