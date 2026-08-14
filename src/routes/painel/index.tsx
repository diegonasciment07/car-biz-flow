import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { whatsappLinkTo } from "@/lib/sargento";
import { getLeadsFn, logoutPainelFn, updateLeadStatusFn } from "./-functions";

export const Route = createFileRoute("/painel/")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }, { title: "Painel" }],
  }),
  component: PainelDashboard,
});

type Lead = Awaited<ReturnType<typeof getLeadsFn>>[number];
type Status = "novo" | "contatado" | "convertido";

const STATUS_LABEL: Record<Status, string> = {
  novo: "Novo",
  contatado: "Contatado",
  convertido: "Convertido",
};

function formatData(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function veiculoTxt(lead: Lead) {
  return [lead.vehicle_type, lead.marca, lead.modelo].filter(Boolean).join(" ");
}

function instalacaoTxt(lead: Lead) {
  if (lead.install_mode === "loja") return "Na loja";
  if (lead.install_mode === "local")
    return lead.endereco ? `Em ${lead.endereco}` : "No endereço do cliente";
  return "—";
}

function PainelDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    getLeadsFn()
      .then(setLeads)
      .catch(() => navigate({ to: "/painel/entrar" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- roda só uma vez, no mount
  }, []);

  async function mudarStatus(id: string, status: Status) {
    setLeads((prev) => prev?.map((l) => (l.id === id ? { ...l, status } : l)) ?? null);
    try {
      await updateLeadStatusFn({ data: { id, status } });
    } catch {
      setErro("Não foi possível salvar o status. Tente novamente.");
    }
  }

  async function sair() {
    await logoutPainelFn();
    navigate({ to: "/painel/entrar" });
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="text-xl text-foreground">Leads</h1>
          <button
            onClick={sair}
            className="rounded-lg border border-border px-4 py-2 text-sm text-mist transition hover:text-white"
          >
            Sair
          </button>
        </div>

        {erro && <p className="mt-4 text-sm text-destructive">{erro}</p>}

        {leads === null && <p className="mt-8 text-sm text-muted-foreground">Carregando...</p>}

        {leads?.length === 0 && (
          <p className="mt-8 text-sm text-muted-foreground">Nenhum cadastro ainda.</p>
        )}

        <div className="mt-6 space-y-3">
          {leads?.map((lead) => (
            <div key={lead.id} className="surface-panel rounded-2xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg text-white">{lead.nome}</p>
                  <p className="text-sm text-muted-foreground">{veiculoTxt(lead)}</p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
                  {formatData(lead.created_at)}
                </span>
              </div>

              <div className="mt-3 grid gap-1 text-sm text-muted-foreground">
                <span>Telefone: {lead.telefone}</span>
                {lead.email && <span>E-mail: {lead.email}</span>}
                <span>Instalação: {instalacaoTxt(lead)}</span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href={whatsappLinkTo(
                    lead.telefone,
                    `Olá, ${lead.nome.split(" ")[0]}! Aqui é da Sargento Rastreamento, vi seu cadastro pelo site.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:brightness-110"
                >
                  Chamar no WhatsApp
                </a>

                <select
                  value={lead.status}
                  onChange={(e) => mudarStatus(lead.id, e.target.value as Status)}
                  className="h-10 rounded-lg border border-input bg-navy-950/60 px-3 text-sm text-white outline-none focus:border-primary"
                >
                  {(Object.keys(STATUS_LABEL) as Status[]).map((s) => (
                    <option key={s} value={s} className="bg-navy-900">
                      {STATUS_LABEL[s]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
