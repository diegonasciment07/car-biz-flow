import { ExternalLink } from "@/components/ExternalLink";
import { calEmbedUrl, CAL_EVENT_LABEL, type CalPrefill } from "@/lib/calcom";
import { whatsappLink } from "@/lib/sargento";

export function CalScheduler({ prefill, waMessage }: { prefill: CalPrefill; waMessage: string }) {
  const url = calEmbedUrl(prefill);

  if (!url) {
    return (
      <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-6 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
          Agenda online
        </span>
        <h4 className="mt-2 font-display text-lg uppercase text-white">
          Agenda em configuração final
        </h4>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Seus dados já foram registrados. Confirme a data e o horário da instalação agora mesmo
          pelo WhatsApp, respondemos em minutos.
        </p>
        <ExternalLink
          href={whatsappLink(waMessage)}
          event="whatsapp_click"
          eventParams={{ location: "agendamento-fallback" }}
          className="mt-5 inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 font-display text-sm uppercase tracking-wide text-primary-foreground shadow-[var(--shadow-gold)] transition hover:brightness-110"
        >
          Escolher data no WhatsApp
        </ExternalLink>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-navy-950/60">
      <div className="border-b border-border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
        {CAL_EVENT_LABEL} · escolha data e horário
      </div>
      <iframe
        title="Agendamento da instalação"
        src={url}
        loading="lazy"
        className="h-[620px] w-full border-0"
      />
    </div>
  );
}
