const ITENS = [
  "Rastreio em tempo real",
  "Bloqueio remoto",
  "Cerca virtual",
  "Central 24h",
  "App próprio Android e iOS",
  "Histórico de trajetos",
  "Controle de velocidade",
  "Hodômetro",
  "Instalação em Manaus",
];

/** Faixa de tecnologia em movimento contínuo. */
export function TechTicker() {
  return (
    <div className="relative flex overflow-hidden border-y border-border bg-navy-900/60 py-3.5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy-950 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy-950 to-transparent"
      />
      {[0, 1].map((k) => (
        <ul
          key={k}
          aria-hidden={k === 1}
          className="marquee flex shrink-0 items-center gap-10 pr-10 font-mono text-[11px] uppercase tracking-[0.2em] text-mist"
        >
          {ITENS.map((i) => (
            <li key={i} className="flex items-center gap-3 whitespace-nowrap">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {i}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
