import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "@/components/ExternalLink";
import { LeadFilter } from "@/components/LeadFilter";
import { LiveTracker } from "@/components/LiveTracker";
import { TechTicker } from "@/components/TechTicker";
import { Counter, Reveal, ScrollProgress } from "@/components/Motion";
import heroImg from "@/assets/hero-veiculo.jpg";
import logoAsset from "@/assets/logo-sargento-claro.png.asset.json";
import iconeAsset from "@/assets/sargento-icone.png.asset.json";

import {
  EMPRESA,
  FAQ,
  PLANOS,
  RECURSOS,
  WHATSAPP_DEFAULT,
  WHATSAPP_DISPLAY,
} from "@/lib/sargento";

const TITLE = "Rastreamento Veicular em Manaus | Sargento Rastreamento — R$49,90/mês";
const DESCRIPTION =
  "Rastreamento veicular com bloqueio, resgate 24h e app próprio em Manaus. Mais de 500 clientes ativos. Mensalidade de R$49,90 e instalação por R$50,00.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "rastreamento veicular Manaus, rastreador de carro Manaus, rastreador de moto Manaus, bloqueio veicular, resgate 24h Manaus, Sargento Rastreamento",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          legalName: EMPRESA.razaoSocial,
          name: EMPRESA.nomeFantasia,
          taxID: EMPRESA.cnpj,
          image: iconeAsset.url,
          telephone: "+5592993294007",
          email: EMPRESA.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Av. Cel Sávio Belota, 30",
            addressLocality: "Manaus",
            addressRegion: "AM",
            addressCountry: "BR",
            postalCode: "69098-270",
          },
          priceRange: "R$49,90",
          areaServed: { "@type": "City", name: "Manaus" },
          openingHours: "Mo-Su 00:00-23:59",
          sameAs: [EMPRESA.instagram],
          description:
            "Rastreio, bloqueio e resgate veicular 24h para carros, motos e caminhões em Manaus, AM.",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Planos de rastreamento veicular",
            itemListElement: PLANOS.map((p) => ({
              "@type": "Offer",
              name: `Rastreamento ${p.nome}`,
              price: "49.90",
              priceCurrency: "BRL",
              description: `Rastreamento veicular para ${p.nome.toLowerCase()} em Manaus com ${p.itens.join(", ")}. Instalação por R$50,00.`,
            })),
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

function CtaWhats({ className = "", label = "Falar no WhatsApp" }) {
  return (
    <ExternalLink
      href={WHATSAPP_DEFAULT}
      event="whatsapp_click"
      eventParams={{ location: label }}
      className={`inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3.5 text-sm font-medium tracking-tight text-primary-foreground transition hover:brightness-110 active:scale-[0.99] ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm5.8 14.05c-.25.69-1.45 1.32-2 1.4-.53.08-1.19.11-1.92-.12a17.6 17.6 0 0 1-1.74-.64c-3.06-1.32-5.06-4.4-5.21-4.6-.15-.2-1.25-1.66-1.25-3.17s.8-2.25 1.08-2.56c.28-.31.61-.39.81-.39l.58.01c.19.01.44-.07.69.53.25.6.85 2.07.93 2.22.07.15.12.33.02.53-.1.2-.15.33-.3.5l-.44.52c-.15.15-.3.32-.13.62.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.36 1.46.3.15.47.13.64-.08.17-.2.74-.86.94-1.16.2-.3.4-.25.66-.15.27.1 1.7.8 1.99.95.29.15.48.22.55.35.07.13.07.74-.18 1.43Z" />
      </svg>
      {label}
    </ExternalLink>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-6 inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-steel">
      <span className="h-px w-6 bg-gold/60" />
      {children}
    </span>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-border bg-navy-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <img
            src={logoAsset.url}
            alt="Sargento Rastreamento Veicular"
            width={1920}
            height={860}
            className="h-8 w-auto md:h-9"
          />
          <nav className="hidden items-center gap-9 text-sm text-mist md:flex">
            <a href="#solucao" className="transition hover:text-ink">Solução</a>
            <a href="#app" className="transition hover:text-ink">Aplicativo</a>
            <a href="#planos" className="transition hover:text-ink">Planos</a>
            <a href="#duvidas" className="transition hover:text-ink">Dúvidas</a>
          </nav>
          <ExternalLink
            href={WHATSAPP_DEFAULT}
            event="whatsapp_click"
            eventParams={{ location: "header" }}
            className="rounded-lg border border-gold/40 px-4 py-2 text-sm text-gold transition hover:bg-gold/10"
          >
            {WHATSAPP_DISPLAY}
          </ExternalLink>
        </div>
        <ScrollProgress />
      </header>

      {/* HERO — split: mensagem | cotação */}
      <section id="cotacao" className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 [background-image:var(--gradient-hero)]" />
        <img
          src={heroImg}
          alt="Veículo protegido por rastreamento da Sargento em Manaus à noite"
          width={1600}
          height={1200}
          className="absolute inset-y-0 right-0 h-full w-2/3 object-cover object-center opacity-[0.14] [mask-image:linear-gradient(to_left,black,transparent_85%)]"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-rise">
            <Eyebrow>Manaus / AM · Central 24 horas</Eyebrow>
            <h1 className="text-[clamp(2.4rem,5vw,3.9rem)] font-semibold">
              Seu veículo rastreado, bloqueado e resgatado por quem{" "}
              <span className="text-gold">atende de madrugada</span>.
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Rastreamento com bloqueio remoto, app próprio e central de resgate 24h em Manaus. Por{" "}
              <strong className="font-medium text-ink">R$ 49,90/mês</strong>, com instalação de{" "}
              <strong className="font-medium text-ink">R$ 50,00</strong>.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CtaWhats />
              <a
                href="#solucao"
                className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3.5 text-sm text-ink transition hover:border-gold/50 hover:bg-white/[0.03]"
              >
                Como funciona
              </a>
            </div>
            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                { n: 500, suffix: "+", l: "clientes ativos" },
                { n: 24, suffix: "h", l: "central e resgate" },
                { n: 90, prefix: "+", suffix: "%", l: "recuperação" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-3xl font-medium text-ink">
                    <Counter value={s.n} prefix={s.prefix ?? ""} suffix={s.suffix} />
                  </dt>
                  <dd className="mt-1.5 text-xs tracking-wide text-steel">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="animate-rise lg:pl-4">
            <LeadFilter />
          </div>
        </div>
      </section>

      <TechTicker />

      {/* SOLUÇÃO */}
      <section id="solucao" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <Eyebrow>A solução</Eyebrow>
            <h2 className="text-[clamp(1.9rem,3.4vw,2.7rem)]">
              Rastreador todo mundo vende. Atendimento é o que separa.
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            O mercado de Manaus está cheio de mensalidade barata e central que não atende. A
            Sargento opera equipamento de alta precisão, bloqueio remoto e uma equipe local que
            responde na hora em que o seu carro some — não no dia seguinte.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {RECURSOS.map((r, i) => (
            <Reveal
              key={r.titulo}
              as="article"
              delay={i * 60}
              className="group bg-navy-950 p-7 transition hover:bg-navy-900"
            >
              <span className="text-xs tracking-widest text-gold/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg">{r.titulo}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* APP PRÓPRIO */}
      <section id="app" className="border-y border-border bg-navy-900/50">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <Eyebrow>Aplicativo próprio</Eyebrow>
            <h2 className="text-[clamp(1.8rem,3.2vw,2.5rem)]">
              O controle do veículo na palma da mão
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Nosso app é da Sargento — não é plataforma alugada de terceiros. Mapa ao vivo,
              histórico de trajetos, cerca virtual e acionamento da central em um toque.
            </p>
            <ul className="mt-8 grid gap-3.5 sm:grid-cols-2">
              {[
                "Mapa ao vivo do veículo",
                "Histórico de trajetos",
                "Alertas de cerca virtual",
                "Disk emergência em 1 toque",
              ].map((i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-mist">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <LiveTracker />
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <Eyebrow>Planos</Eyebrow>
          <h2 className="text-[clamp(1.9rem,3.4vw,2.7rem)]">
            Um preço só, sem letra miúda
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Moto, carro ou veículo pesado: mesma mensalidade, mesma taxa de instalação. Sem
            fidelidade escondida e sem cobrança surpresa.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PLANOS.map((p, pi) => (
            <Reveal
              key={p.nome}
              as="article"
              delay={pi * 80}
              className={`hover-lift relative flex flex-col rounded-xl border p-8 ${
                p.destaque
                  ? "border-gold/45 bg-navy-900"
                  : "border-border bg-navy-900/40 hover:border-white/15"
              }`}
            >
              <span className="text-[11px] uppercase tracking-[0.2em] text-steel">{p.tag}</span>
              <h3 className="mt-3 text-2xl">{p.nome}</h3>
              <p className="mt-6 flex items-end gap-1.5">
                <span className="font-display text-4xl font-medium text-ink">R$ 49,90</span>
                <span className="pb-1.5 text-sm text-steel">/mês</span>
              </p>
              <p className="mt-2 text-sm text-mist">Instalação única de R$ 50,00</p>
              <ul className="mt-8 flex-1 space-y-3 border-t border-border pt-7">
                {p.itens.map((i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-mist">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {i}
                  </li>
                ))}
              </ul>
              <a
                href="#cotacao"
                className={`mt-8 inline-flex h-11 items-center justify-center rounded-lg text-sm font-medium transition ${
                  p.destaque
                    ? "bg-primary text-primary-foreground hover:brightness-110"
                    : "border border-border text-ink hover:border-gold/50"
                }`}
              >
                Fazer cotação
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DÚVIDAS / FAQ */}
      <section id="duvidas" className="border-y border-border bg-navy-900/50">
        <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
          <div className="mb-14">
            <Eyebrow>Dúvidas frequentes</Eyebrow>
            <h2 className="text-[clamp(1.9rem,3.4vw,2.6rem)]">
              O que perguntam antes de contratar
            </h2>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <h3 className="text-base md:text-lg">{f.q}</h3>
                  <span className="mt-1 shrink-0 text-gold transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <h2 className="text-[clamp(2rem,4vw,3rem)]">
          Fale agora com a Sargento
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Em minutos você tira suas dúvidas e já agenda a instalação em Manaus.
        </p>
        <div className="mt-9 flex justify-center">
          <CtaWhats label="Chamar no WhatsApp" />
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-steel">
          {WHATSAPP_DISPLAY} · Manaus / AM
        </p>
      </section>

      {/* RODAPÉ */}
      <footer className="border-t border-border bg-navy-900">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <img
              src={logoAsset.url}
              alt="Sargento Rastreamento Veicular"
              width={1920}
              height={860}
              loading="lazy"
              className="h-9 w-auto"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-steel">
              Rastreio, bloqueio e resgate veicular 24h para carros, motos e caminhões em Manaus, AM.
            </p>
          </div>
          <div className="text-sm leading-relaxed text-steel">
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-mist">Empresa</p>
            <p>{EMPRESA.razaoSocial}</p>
            <p className="mt-1">CNPJ {EMPRESA.cnpj}</p>
            <address className="mt-3 not-italic">{EMPRESA.endereco}</address>
          </div>
          <div className="text-sm text-steel">
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-mist">Contato</p>
            <ExternalLink
              href={WHATSAPP_DEFAULT}
              event="whatsapp_click"
              eventParams={{ location: "footer" }}
              className="inline-flex items-center gap-2 text-mist transition hover:text-gold"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Z" />
              </svg>
              {WHATSAPP_DISPLAY}
            </ExternalLink>
            <br />
            <ExternalLink
              href={EMPRESA.instagram}
              event="instagram_click"
              eventParams={{ location: "footer" }}
              className="mt-3 inline-flex items-center gap-2 text-mist transition hover:text-gold"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
              @sargentorastreamento
            </ExternalLink>
            <p className="mt-3">{EMPRESA.email}</p>
          </div>
        </div>
        <div className="border-t border-border">
          <p className="mx-auto max-w-6xl px-6 py-6 text-[11px] uppercase tracking-[0.18em] text-steel">
            © {new Date().getFullYear()} {EMPRESA.nomeFantasia} — Manaus / AM
          </p>
        </div>
      </footer>

      {/* WHATSAPP FLUTUANTE */}
      <ExternalLink
        href={WHATSAPP_DEFAULT}
        event="whatsapp_click"
        eventParams={{ location: "float" }}
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-whatsapp text-navy-950 shadow-[var(--shadow-panel)] transition hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm5.8 14.05c-.25.69-1.45 1.32-2 1.4-.53.08-1.19.11-1.92-.12a17.6 17.6 0 0 1-1.74-.64c-3.06-1.32-5.06-4.4-5.21-4.6-.15-.2-1.25-1.66-1.25-3.17s.8-2.25 1.08-2.56c.28-.31.61-.39.81-.39l.58.01c.19.01.44-.07.69.53.25.6.85 2.07.93 2.22.07.15.12.33.02.53-.1.2-.15.33-.3.5l-.44.52c-.15.15-.3.32-.13.62.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.36 1.46.3.15.47.13.64-.08.17-.2.74-.86.94-1.16.2-.3.4-.25.66-.15.27.1 1.7.8 1.99.95.29.15.48.22.55.35.07.13.07.74-.18 1.43Z" />
        </svg>
      </ExternalLink>
    </div>
  );
}

