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

function CtaWhats({ className = "", label = "Falar no WhatsApp agora" }) {
  return (
    <ExternalLink
      href={WHATSAPP_DEFAULT}
      event="whatsapp_click"
      eventParams={{ location: label }}
      className={`inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-7 py-4 font-display text-base uppercase tracking-wide text-primary-foreground shadow-[var(--shadow-gold)] transition hover:brightness-110 active:scale-[0.99] ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm5.8 14.05c-.25.69-1.45 1.32-2 1.4-.53.08-1.19.11-1.92-.12a17.6 17.6 0 0 1-1.74-.64c-3.06-1.32-5.06-4.4-5.21-4.6-.15-.2-1.25-1.66-1.25-3.17s.8-2.25 1.08-2.56c.28-.31.61-.39.81-.39l.58.01c.19.01.44-.07.69.53.25.6.85 2.07.93 2.22.07.15.12.33.02.53-.1.2-.15.33-.3.5l-.44.52c-.15.15-.3.32-.13.62.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.36 1.46.3.15.47.13.64-.08.17-.2.74-.86.94-1.16.2-.3.4-.25.66-.15.27.1 1.7.8 1.99.95.29.15.48.22.55.35.07.13.07.74-.18 1.43Z" />
      </svg>
      {label}
    </ExternalLink>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-5 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 [animation:radar-ring_2.4s_ease-out_infinite]" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
      </span>
      {children}
    </span>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-navy-950/85 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 py-3.5">
          <img
            src={logoAsset.url}
            alt="Sargento Rastreamento Veicular"
            width={1920}
            height={860}
            className="h-9 w-auto md:h-11"
          />
          <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.15em] text-mist md:flex">
            <a href="#solucao" className="transition hover:text-primary">Solução</a>
            <a href="#planos" className="transition hover:text-primary">Planos</a>
            <a href="#cotacao" className="transition hover:text-primary">Agendar</a>
            <a href="#duvidas" className="transition hover:text-primary">Dúvidas</a>
          </nav>
          <ExternalLink
            href={WHATSAPP_DEFAULT}
            event="whatsapp_click"
            eventParams={{ location: "header" }}
            className="rounded-lg bg-primary px-4 py-2.5 font-display text-xs uppercase tracking-wider text-primary-foreground transition hover:brightness-110 md:px-5 md:text-sm"
          >
            WhatsApp
          </ExternalLink>
        </div>
        <ScrollProgress />
      </header>


      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 [background-image:var(--gradient-hero)]" />
        <img
          src={heroImg}
          alt="SUV protegido por rastreamento veicular da Sargento em Manaus à noite"
          width={1600}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-30 md:opacity-45 md:[mask-image:linear-gradient(to_right,transparent_0%,black_45%)]"
        />
        <div className="grid-backdrop absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-32">
          <div className="max-w-2xl animate-rise">
            <Eyebrow>Central de resgate 24h · Manaus / AM</Eyebrow>
            <h1 className="text-[clamp(2.3rem,6.2vw,4.2rem)] font-bold">
              Mais de 500 clientes confiam na{" "}
              <span className="text-gradient-gold">Sargento Rastreamento</span> em Manaus
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Rastreamento com bloqueio, resgate 24h e assistência de verdade — por{" "}
              <strong className="font-semibold text-white">R$49,90/mês</strong>, com taxa simbólica
              de instalação de <strong className="font-semibold text-white">R$50,00</strong>.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CtaWhats />
              <a
                href="#cotacao"
                className="inline-flex items-center justify-center rounded-xl border border-border px-7 py-4 font-display text-base uppercase tracking-wide text-white transition hover:border-primary/70 hover:bg-white/5"
              >
                Simular meu veículo
              </a>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-7">
              {[
                { n: 500, suffix: "+", l: "clientes ativos" },
                { n: 24, suffix: "h", l: "resgate e disk" },
                { n: 90, prefix: "+", suffix: "%", l: "chance de recuperação" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-3xl text-primary md:text-4xl">
                    <Counter value={s.n} prefix={s.prefix ?? ""} suffix={s.suffix} />
                  </dt>
                  <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-steel">
                    {s.l}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <TechTicker />


      {/* PROBLEMA */}
      <section className="border-y border-border bg-navy-900/40">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
            <h2 className="text-[clamp(1.7rem,3.4vw,2.6rem)]">
              Contratar rastreamento é fácil. Confiar em quem atende quando você precisar, não.
            </h2>
            <p className="text-lg text-muted-foreground">
              O mercado de rastreamento veicular em Manaus tem muita opção — e é difícil saber qual
              empresa realmente vai atender na hora que seu carro sumir, e qual vai só te vender uma
              mensalidade e sumir depois da instalação.
            </p>
          </div>
        </div>
      </section>

      {/* SOLUÇÃO */}
      <section id="solucao" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="max-w-2xl">
          <Eyebrow>A solução</Eyebrow>
          <h2 className="text-[clamp(1.8rem,3.6vw,2.8rem)]">
            A Sargento não é só um app de localização
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Rastreamento com bloqueio remoto, controle total pelo nosso aplicativo próprio, e uma
            central de resgate e assistência 24h que atua de verdade quando você aciona — não só um
            ponto no mapa.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {RECURSOS.map((r, i) => (
            <Reveal
              key={r.titulo}
              as="article"
              delay={i * 60}
              className="group relative bg-navy-900/80 p-6 transition hover:bg-navy-800"
            >
              <span className="font-mono text-[11px] text-primary/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-base tracking-wide transition group-hover:text-primary">
                {r.titulo}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
            </Reveal>
          ))}
        </div>

      </section>

      {/* APP PRÓPRIO */}
      <section className="border-y border-border bg-navy-900/40">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <Eyebrow>Aplicativo próprio</Eyebrow>
            <h2 className="text-[clamp(1.7rem,3.4vw,2.5rem)]">
              O controle do seu veículo na sua mão
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              A Sargento tem aplicativo próprio — não é plataforma alugada de terceiros. Você abre o
              app e vê onde o veículo está, o histórico de trajetos, a cerca virtual e aciona a
              central em um toque.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Mapa ao vivo do veículo",
                "Histórico de trajetos",
                "Alertas de cerca virtual",
                "Disk emergência em 1 toque",
              ].map((i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-ink">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative w-full max-w-sm">
              <LiveTracker />
            </div>
          </div>

        </div>
      </section>

      {/* PROVA */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="surface-panel scan-sweep grid gap-8 rounded-2xl p-8 md:grid-cols-[auto_1fr] md:items-center md:p-12">
          <p className="font-display text-[clamp(4rem,11vw,7.5rem)] leading-none text-gradient-gold">
            <Counter value={500} suffix="+" duration={1800} />
          </p>

          <div>
            <h2 className="text-2xl">Clientes ativos em Manaus, hoje</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Não é número de campanha. É gente pagando a mensalidade porque o serviço funciona de
              verdade — com equipamento de alta precisão e central que atende às 2h da manhã.
            </p>
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="border-y border-border bg-navy-900/40">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="max-w-2xl">
            <Eyebrow>Planos e preços</Eyebrow>
            <h2 className="text-[clamp(1.8rem,3.6vw,2.8rem)]">
              Um preço, sem letra miúda: R$49,90/mês
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Moto, carro ou veículo pesado — a mesma mensalidade e a mesma taxa simbólica de
              instalação. Sem cobrança escondida.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PLANOS.map((p, pi) => (
              <Reveal
                key={p.nome}
                as="article"
                delay={pi * 90}
                className={`hover-lift relative flex flex-col rounded-2xl border p-7 ${
                  p.destaque
                    ? "border-primary bg-navy-800/80 shadow-[var(--shadow-gold)]"
                    : "border-border bg-navy-950/50 hover:border-primary/60"
                }`}
              >

                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
                    p.destaque ? "text-primary" : "text-steel"
                  }`}
                >
                  {p.tag}
                </span>
                <h3 className="mt-2 text-2xl">{p.nome}</h3>
                <p className="mt-5 flex items-end gap-1.5">
                  <span className="font-display text-4xl text-white">R$49,90</span>
                  <span className="pb-1 text-sm text-muted-foreground">/mês</span>
                </p>
                <p className="mt-1.5 text-sm text-primary">+ instalação de R$50,00</p>
                <ul className="mt-6 flex-1 space-y-2.5 border-t border-border pt-6">
                  {p.itens.map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-ink">
                      <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {i}
                    </li>
                  ))}
                </ul>
                <a
                  href="#cotacao"
                  className={`mt-7 inline-flex h-12 items-center justify-center rounded-xl font-display text-sm uppercase tracking-wide transition ${
                    p.destaque
                      ? "bg-primary text-primary-foreground hover:brightness-110"
                      : "border border-border text-white hover:border-primary/70"
                  }`}
                >
                  Quero este plano
                </a>
              </Reveal>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-muted-foreground">
            Taxa simbólica de instalação de R$50,00 para um equipamento de alta precisão, com
            rastreamento confiável e acompanhamento em tempo real.
          </p>
          <div className="mt-7 flex justify-center">
            <CtaWhats />
          </div>
        </div>
      </section>

      {/* COTAÇÃO / FILTRO */}
      <section id="cotacao" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <Eyebrow>Agendamento de instalação</Eyebrow>
            <h2 className="text-[clamp(1.8rem,3.6vw,2.8rem)]">
              Agende a instalação do seu rastreador
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Preencha os dados do veículo e escolha o local: o técnico vai até você ou você vem à
              nossa base no Novo Aleixo. Na sequência você escolhe data e horário na agenda online.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                ["Data e horário na hora", "Você escolhe o melhor dia direto na nossa agenda."],
                ["Técnico até você", "Instalação no seu endereço em Manaus ou na nossa base."],
                ["Documentos simples", "CNH ou identidade, e-mail e comprovante de residência."],

              ].map(([t, d]) => (
                <li key={t} className="flex gap-3.5">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span>
                    <span className="block font-display text-sm uppercase tracking-wide text-white">{t}</span>
                    <span className="text-sm text-muted-foreground">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <LeadFilter />
        </div>
      </section>

      {/* DÚVIDAS / FAQ */}
      <section id="duvidas" className="border-y border-border bg-navy-900/40">
        <div className="mx-auto max-w-4xl px-5 py-20 md:py-28">
          <div className="mb-12 max-w-2xl">
            <Eyebrow>Perguntas frequentes</Eyebrow>
            <h2 className="text-[clamp(1.8rem,3.6vw,2.8rem)]">
              As dúvidas reais de quem contrata rastreador em Manaus
            </h2>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <h3 className="text-base normal-case tracking-normal md:text-lg">{f.q}</h3>
                  <span className="mt-1 font-mono text-primary transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-3xl text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden">
        <div className="grid-backdrop absolute inset-0 opacity-70" />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center md:py-32">
          <h2 className="text-[clamp(2rem,4.6vw,3.2rem)]">
            Fale agora com a Sargento e tire suas dúvidas
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Em minutos você tira suas dúvidas e pode agendar a instalação do equipamento de alta
            precisão por uma taxa simbólica de R$50,00.
          </p>
          <div className="mt-9 flex justify-center">
            <CtaWhats />
          </div>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-steel">
            {WHATSAPP_DISPLAY} · Manaus / AM
          </p>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="border-t border-border bg-navy-900">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <img
              src={logoAsset.url}
              alt="Sargento Rastreamento Veicular"
              width={1920}
              height={860}
              loading="lazy"
              className="h-10 w-auto"
            />
            <p className="mt-5 max-w-xs text-sm text-steel">
              Rastreio, bloqueio e resgate veicular 24h para carros, motos e caminhões em Manaus, AM.
            </p>
          </div>
          <div className="text-sm text-steel">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-mist">Empresa</p>
            <p>{EMPRESA.razaoSocial}</p>
            <p className="mt-1">CNPJ {EMPRESA.cnpj}</p>
            <address className="mt-3 not-italic">{EMPRESA.endereco}</address>
          </div>
          <div className="text-sm text-steel">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-mist">Contato</p>
            <ExternalLink
              href={WHATSAPP_DEFAULT}
              event="whatsapp_click"
              eventParams={{ location: "footer" }}
              className="inline-flex items-center gap-2 text-ink transition hover:text-primary"
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
              className="mt-3 inline-flex items-center gap-2 text-ink transition hover:text-primary"
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
          <p className="mx-auto max-w-6xl px-5 py-6 font-mono text-[10px] uppercase tracking-[0.15em] text-steel">
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
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-navy-950 shadow-[var(--shadow-panel)] transition hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm5.8 14.05c-.25.69-1.45 1.32-2 1.4-.53.08-1.19.11-1.92-.12a17.6 17.6 0 0 1-1.74-.64c-3.06-1.32-5.06-4.4-5.21-4.6-.15-.2-1.25-1.66-1.25-3.17s.8-2.25 1.08-2.56c.28-.31.61-.39.81-.39l.58.01c.19.01.44-.07.69.53.25.6.85 2.07.93 2.22.07.15.12.33.02.53-.1.2-.15.33-.3.5l-.44.52c-.15.15-.3.32-.13.62.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.36 1.46.3.15.47.13.64-.08.17-.2.74-.86.94-1.16.2-.3.4-.25.66-.15.27.1 1.7.8 1.99.95.29.15.48.22.55.35.07.13.07.74-.18 1.43Z" />
        </svg>
      </ExternalLink>
    </div>
  );
}
