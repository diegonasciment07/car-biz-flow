import { useRef, useState, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink, openExternal } from "@/components/ExternalLink";
import { whatsappLink } from "@/lib/sargento";
import { digits, maskPhone } from "@/lib/phone";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/** Modal suspenso de captação rápida (4 campos) pra quem clicou em "falar no
 * WhatsApp" — grava o lead e já abre o WhatsApp em seguida, sem tirar a
 * pessoa do contexto do clique como o formulário grande de agendamento faz. */
export function WhatsAppLeadModal({ open, onOpenChange }: Props) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [veiculo, setVeiculo] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [empresa, setEmpresa] = useState(""); // honeypot: campo invisível, só bot preenche
  const montadoEm = useRef(Date.now());

  function limpar() {
    setNome("");
    setTelefone("");
    setEmail("");
    setVeiculo("");
    setErro(null);
    setEnviando(false);
    setEmpresa("");
    montadoEm.current = Date.now();
  }

  function fechar(v: boolean) {
    onOpenChange(v);
    if (!v) limpar();
  }

  const wa = whatsappLink(
    `Olá! Sou ${nome.trim() || "cliente"}${veiculo.trim() ? `, tenho um ${veiculo.trim()}` : ""} e quero falar sobre o rastreamento veicular da Sargento.`,
  );

  async function enviar(e: FormEvent) {
    e.preventDefault();
    setErro(null);

    // Anti-spam silencioso: bot preencheu o campo-isca ou enviou rápido
    // demais pra ter digitado 4 campos de verdade. Fecha sem gravar nada.
    if (empresa.trim().length > 0 || Date.now() - montadoEm.current < 2000) {
      fechar(false);
      return;
    }

    if (nome.trim().length < 2) return setErro("Informe seu nome completo.");
    if (digits(telefone).length < 10) return setErro("Informe um WhatsApp válido com DDD.");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      return setErro("Informe um e-mail válido.");

    setEnviando(true);
    const { error } = await supabase.from("leads").insert({
      nome: nome.trim().slice(0, 120),
      telefone: maskPhone(telefone).slice(0, 30),
      email: email.trim().slice(0, 255),
      modelo: veiculo.trim().slice(0, 80) || null,
      origem: "whatsapp-modal",
    });
    setEnviando(false);

    if (error) {
      setErro("Não conseguimos registrar agora, mas você já pode falar com a gente:");
      return;
    }

    openExternal(wa);
    fechar(false);
  }

  return (
    <Dialog open={open} onOpenChange={fechar}>
      <DialogContent className="border-border bg-navy-900 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display uppercase tracking-wide text-white">
            Falar no WhatsApp
          </DialogTitle>
          <DialogDescription>
            4 dados rápidos e já te levamos direto pro WhatsApp.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={enviar} className="mt-2 grid gap-4">
          {/* Honeypot anti-spam: invisível e fora da ordem de tab para humanos, tentador para bots */}
          <input
            type="text"
            name="empresa"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          <label className="block">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
              Nome completo
            </span>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              maxLength={120}
              autoComplete="name"
              autoFocus
              className="h-12 w-full rounded-xl border border-input bg-navy-950/60 px-4 text-white outline-none transition focus:border-primary"
            />
          </label>

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
              E-mail
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

          <label className="block">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
              Modelo do carro
            </span>
            <input
              value={veiculo}
              onChange={(e) => setVeiculo(e.target.value)}
              maxLength={80}
              placeholder="Ex.: Honda Civic"
              className="h-12 w-full rounded-xl border border-input bg-navy-950/60 px-4 text-white placeholder:text-steel outline-none transition focus:border-primary"
            />
          </label>

          {erro && (
            <div className="text-sm text-destructive">
              {erro}
              <ExternalLink
                href={wa}
                event="whatsapp_click"
                eventParams={{ location: "whatsapp-modal-erro" }}
                className="mt-2 block font-medium text-primary underline"
              >
                Falar no WhatsApp agora
              </ExternalLink>
            </div>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="mt-1 h-12 w-full rounded-xl bg-primary font-display text-sm uppercase tracking-wide text-primary-foreground shadow-[var(--shadow-gold)] transition hover:brightness-110 disabled:opacity-60"
          >
            {enviando ? "Enviando..." : "Ir para o WhatsApp"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
