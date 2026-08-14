import { useState } from "react";
import { FEATURES } from "@/lib/features";
import { PLANOS, PRECO_MENSAL, TAXA_INSTALACAO } from "@/lib/sargento";

type PricingPlateProps = {
  /** Chamado ao clicar em "Quero o plano X" — direciona pro formulário em vez de abrir o WhatsApp direto. */
  onWantsWhatsApp: (location: string) => void;
};

/** Placa de preço única com seletor de veículo — substitui 3 cards que repetiam a mesma lista de recursos. */
export function PricingPlate({ onWantsWhatsApp }: PricingPlateProps) {
  const [nome, setNome] = useState<(typeof PLANOS)[number]["nome"]>("Carro");
  const plano = PLANOS.find((p) => p.nome === nome) ?? PLANOS[1]!;

  return (
    <div className="surface-panel rounded-2xl p-7 md:p-10">
      <div className="grid gap-3 sm:grid-cols-3">
        {PLANOS.map((p) => (
          <button
            key={p.nome}
            type="button"
            aria-pressed={p.nome === nome}
            onClick={() => setNome(p.nome)}
            className={`rounded-xl border p-4 text-left transition ${
              p.nome === nome
                ? "border-primary bg-primary/10"
                : "border-border bg-white/[0.02] hover:border-primary/60"
            }`}
          >
            <span className="block font-display text-base uppercase text-white">{p.nome}</span>
            <span className="mt-1 block text-xs text-muted-foreground">{p.tag}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-border pt-8">
        <p className="flex items-end gap-1.5">
          <span className="font-display text-5xl text-white md:text-6xl">{PRECO_MENSAL}</span>
          <span className="pb-1.5 text-muted-foreground">/mês</span>
        </p>
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-primary">
          + instalação única de {TAXA_INSTALACAO}
        </p>
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {FEATURES.map((f) => {
          const incluido = (plano.itens as readonly string[]).includes(f.label);
          const Icon = f.icon;
          return (
            <li
              key={f.label}
              className={`flex items-center gap-3 text-sm transition ${
                incluido ? "text-ink" : "text-steel/40 line-through"
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${incluido ? "text-primary" : "text-steel/30"}`} />
              {f.label}
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => onWantsWhatsApp(`plano-${plano.nome}`)}
        className="mt-9 flex h-12 w-full items-center justify-center rounded-xl bg-primary font-display text-sm uppercase tracking-wide text-primary-foreground shadow-[var(--shadow-gold)] transition hover:brightness-110"
      >
        Quero o plano {plano.nome}
      </button>
    </div>
  );
}
