import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink } from "@/components/ExternalLink";
import { MARCAS, whatsappLink } from "@/lib/sargento";

type VehicleType = "Carro" | "Moto" | "Caminhão / Frota";

const VEHICLES: { value: VehicleType; label: string; hint: string }[] = [
  { value: "Carro", label: "Carro", hint: "Passeio, SUV, utilitário" },
  { value: "Moto", label: "Moto", hint: "Urbana, trail, delivery" },
  { value: "Caminhão / Frota", label: "Frota", hint: "Pesados e vários veículos" },
];

const STEPS = ["Veículo", "Marca e modelo", "Seus dados"];

function digits(v: string) {
  return v.replace(/\D/g, "").slice(0, 11);
}

function maskPhone(v: string) {
  const d = digits(v);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function LeadFilter() {
  const [step, setStep] = useState(0);
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [ok, setOk] = useState(false);

  const wa = whatsappLink(
    `Olá! Sou ${nome || "cliente"} e quero rastreamento para meu ${vehicle ?? "veículo"} ${marca} ${modelo}`.trim(),
  );

  async function enviar() {
    setErro(null);
    if (nome.trim().length < 2) return setErro("Informe seu nome completo.");
    if (digits(telefone).length < 10) return setErro("Informe um WhatsApp válido com DDD.");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      return setErro("E-mail inválido.");

    setEnviando(true);
    const { error } = await supabase.from("leads").insert({
      nome: nome.trim().slice(0, 120),
      telefone: maskPhone(telefone).slice(0, 30),
      email: email.trim().slice(0, 255) || null,
      vehicle_type: vehicle,
      marca: marca.slice(0, 80) || null,
      modelo: modelo.trim().slice(0, 80) || null,
      origem: "landing-page",
    });
    setEnviando(false);
    if (error) {
      setErro("Não conseguimos registrar agora. Fale direto no WhatsApp abaixo.");
      return;
    }
    setOk(true);
  }

  if (ok) {
    return (
      <div className="surface-panel rounded-2xl p-8 text-center md:p-10">
        <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground radar-pulse">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-2xl">Cotação registrada, {nome.split(" ")[0]}</h3>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Seu {vehicle?.toLowerCase()} {marca} {modelo} já está com a nossa equipe. Para adiantar a
          instalação, chame agora no WhatsApp — respondemos em minutos.
        </p>
        <ExternalLink
          href={wa}
          event="whatsapp_click"
          eventParams={{ location: "lead-form-success" }}
          className="mt-6 inline-flex h-13 items-center justify-center rounded-xl bg-primary px-7 py-3.5 font-display text-base uppercase tracking-wide text-primary-foreground shadow-[var(--shadow-gold)] transition hover:brightness-110"
        >
          Falar no WhatsApp agora
        </ExternalLink>
      </div>
    );
  }

  return (
    <div className="surface-panel rounded-2xl p-6 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        {STEPS.map((s, i) => (
          <div key={s} className="flex-1">
            <div
              className={`h-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-white/12"}`}
            />
            <span
              className={`mt-2 block font-mono text-[10px] uppercase tracking-[0.18em] ${
                i <= step ? "text-primary" : "text-steel"
              }`}
            >
              {s}
            </span>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="animate-rise">
          <h3 className="text-xl">Qual veículo você quer proteger?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Em 30 segundos montamos a cotação certa para o seu caso.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {VEHICLES.map((v) => (
              <button
                key={v.value}
                type="button"
                onClick={() => {
                  setVehicle(v.value);
                  setStep(1);
                }}
                className={`group rounded-xl border p-4 text-left transition ${
                  vehicle === v.value
                    ? "border-primary bg-primary/10"
                    : "border-border bg-white/[0.02] hover:border-primary/60 hover:bg-primary/5"
                }`}
              >
                <span className="block font-display text-lg uppercase text-white">{v.label}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{v.hint}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="animate-rise">
          <h3 className="text-xl">Marca e modelo do {vehicle?.toLowerCase()}</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
                Marca
              </span>
              <select
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                className="h-12 w-full rounded-xl border border-input bg-navy-950/60 px-4 text-white outline-none transition focus:border-primary"
              >
                <option value="">Selecione</option>
                {MARCAS.map((m) => (
                  <option key={m} value={m} className="bg-navy-900">
                    {m}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
                Modelo
              </span>
              <input
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                maxLength={80}
                placeholder="Ex.: Onix 1.0, Fan 160, Cargo 816"
                className="h-12 w-full rounded-xl border border-input bg-navy-950/60 px-4 text-white placeholder:text-steel outline-none transition focus:border-primary"
              />
            </label>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="h-12 rounded-xl border border-border px-5 font-display text-sm uppercase tracking-wide text-mist transition hover:text-white"
            >
              Voltar
            </button>
            <button
              type="button"
              disabled={!marca}
              onClick={() => setStep(2)}
              className="h-12 flex-1 rounded-xl bg-primary px-5 font-display text-sm uppercase tracking-wide text-primary-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-rise">
          <h3 className="text-xl">Para onde enviamos sua cotação?</h3>
          <div className="mt-5 grid gap-4">
            <label className="block">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
                Nome completo
              </span>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                maxLength={120}
                autoComplete="name"
                className="h-12 w-full rounded-xl border border-input bg-navy-950/60 px-4 text-white outline-none transition focus:border-primary"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
                  WhatsApp
                </span>
                <input
                  value={telefone}
                  onChange={(e) => setTelefone(maskPhone(e.target.value))}
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(92) 90000-0000"
                  className="h-12 w-full rounded-xl border border-input bg-navy-950/60 px-4 text-white placeholder:text-steel outline-none transition focus:border-primary"
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
                  E-mail (opcional)
                </span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255}
                  inputMode="email"
                  autoComplete="email"
                  className="h-12 w-full rounded-xl border border-input bg-navy-950/60 px-4 text-white outline-none transition focus:border-primary"
                />
              </label>
            </div>
          </div>

          {erro && <p className="mt-4 text-sm text-destructive">{erro}</p>}

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="h-12 rounded-xl border border-border px-5 font-display text-sm uppercase tracking-wide text-mist transition hover:text-white"
            >
              Voltar
            </button>
            <button
              type="button"
              onClick={enviar}
              disabled={enviando}
              className="h-12 flex-1 rounded-xl bg-primary px-5 font-display text-sm uppercase tracking-wide text-primary-foreground shadow-[var(--shadow-gold)] transition hover:brightness-110 disabled:opacity-60"
            >
              {enviando ? "Enviando..." : "Ver minha cotação"}
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-steel">
            Seus dados são usados só para o atendimento da Sargento. Sem spam.
          </p>
        </div>
      )}
    </div>
  );
}
