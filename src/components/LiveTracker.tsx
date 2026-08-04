import { useEffect, useMemo, useRef, useState } from "react";

type RouteDef = {
  id: string;
  label: string;
  d: string;
  km: number;
  ruas: string[];
};

const ROTAS: RouteDef[] = [
  {
    id: "centro",
    label: "Centro → Ponta Negra",
    d: "M18 208 C 70 196, 88 150, 132 140 S 210 148, 236 112 S 268 52, 322 44",
    km: 14.2,
    ruas: [
      "Av. Cel Sávio Belota",
      "Av. Constantino Nery",
      "Av. Darcy Vargas",
      "Av. Coronel Teixeira",
      "Ponta Negra",
    ],
  },
  {
    id: "leste",
    label: "Zona Leste → Distrito",
    d: "M20 60 C 80 70, 110 130, 160 150 S 240 200, 320 190",
    km: 21.7,
    ruas: [
      "Av. Autaz Mirim",
      "Av. Grande Circular",
      "Av. Cosme Ferreira",
      "Av. Buriti",
      "Distrito Industrial",
    ],
  },
  {
    id: "aeroporto",
    label: "Aeroporto → Adrianópolis",
    d: "M24 130 C 90 120, 120 60, 190 70 S 260 150, 322 120",
    km: 17.4,
    ruas: [
      "Av. Santos Dumont",
      "Av. Torquato Tapajós",
      "Av. Djalma Batista",
      "Av. Mário Ypiranga",
      "Adrianópolis",
    ],
  },
];

const VEICULOS = [
  { id: "carro", label: "Carro", vel: 46 },
  { id: "moto", label: "Moto", vel: 54 },
  { id: "frota", label: "Frota", vel: 34 },
] as const;

/**
 * Mapa vivo em modo simulação: o usuário troca veículo e rota, acompanha a
 * distância percorrida em tempo real e pode acionar o bloqueio remoto.
 */
export function LiveTracker() {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [t, setT] = useState(0);
  const [pos, setPos] = useState({ x: 18, y: 208 });
  const [bloqueado, setBloqueado] = useState(false);
  const [rotaId, setRotaId] = useState(ROTAS[0]!.id);
  const [veiculoId, setVeiculoId] = useState<(typeof VEICULOS)[number]["id"]>("carro");

  const rota = ROTAS.find((r) => r.id === rotaId) ?? ROTAS[0]!;
  const veiculo = VEICULOS.find((v) => v.id === veiculoId) ?? VEICULOS[0]!;

  useEffect(() => {
    setT(0);
    setBloqueado(false);
  }, [rotaId, veiculoId]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setT((prev) => (prev + dt * (bloqueado ? 0 : (veiculo.vel / 46) * 0.055)) % 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [bloqueado, veiculo.vel]);

  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const len = p.getTotalLength();
    const pt = p.getPointAtLength(len * t);
    setPos({ x: pt.x, y: pt.y });
  }, [t, rota.d]);

  const velocidade = useMemo(
    () => (bloqueado ? 0 : Math.round(veiculo.vel + Math.sin(t * Math.PI * 6) * 12)),
    [t, bloqueado, veiculo.vel],
  );
  const percorrido = (rota.km * t).toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const rua = rota.ruas[Math.min(rota.ruas.length - 1, Math.floor(t * rota.ruas.length))] ?? "";

  return (
    <div className="surface-panel relative overflow-hidden rounded-3xl p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-70 [animation:radar-ring_2.2s_ease-out_infinite]" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Modo simulação · Manaus/AM
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
          GPS 12 sat
        </span>
      </div>

      <div className="mb-4 grid gap-3">
        <div>
          <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-steel">Veículo</p>
          <div className="grid grid-cols-3 gap-2">
            {VEICULOS.map((v) => (
              <button
                key={v.id}
                type="button"
                aria-pressed={veiculoId === v.id}
                onClick={() => setVeiculoId(v.id)}
                className={`h-10 rounded-xl border font-display text-xs uppercase tracking-wide transition ${
                  veiculoId === v.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-mist hover:border-primary/60 hover:text-white"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
        <label className="block">
          <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-steel">
            Rota
          </span>
          <select
            value={rotaId}
            onChange={(e) => setRotaId(e.target.value)}
            className="h-10 w-full rounded-xl border border-input bg-navy-950/60 px-3 text-sm text-white outline-none transition focus:border-primary"
          >
            {ROTAS.map((r) => (
              <option key={r.id} value={r.id} className="bg-navy-900">
                {r.label} · {r.km.toLocaleString("pt-BR")} km
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-navy-950/70">
        <div className="grid-backdrop absolute inset-0 opacity-70" />
        <svg viewBox="0 0 340 240" className="relative block h-auto w-full">
          {/* malha viária */}
          <g stroke="currentColor" className="text-white/8" strokeWidth="10" strokeLinecap="round">
            <path d="M-10 180 H 350" />
            <path d="M-10 90 H 350" />
            <path d="M90 -10 V 250" />
            <path d="M250 -10 V 250" />
          </g>
          <g stroke="currentColor" className="text-white/12" strokeWidth="1" strokeDasharray="6 8">
            <path d="M-10 180 H 350" />
            <path d="M90 -10 V 250" />
          </g>

          {/* rota */}
          <path
            ref={pathRef}
            d={rota.d}
            fill="none"
            stroke="var(--gold)"
            strokeOpacity="0.28"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d={rota.d}
            fill="none"
            stroke="var(--gold)"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - t}
            style={{ filter: "drop-shadow(0 0 6px var(--gold))" }}
          />

          {/* cerca virtual */}
          <circle
            cx="236"
            cy="112"
            r="52"
            fill="var(--gold)"
            fillOpacity="0.05"
            stroke="var(--gold)"
            strokeOpacity="0.35"
            strokeDasharray="5 6"
          />
          <text x="236" y="52" textAnchor="middle" className="fill-primary" fontSize="9" fontFamily="monospace">
            CERCA VIRTUAL
          </text>

          {/* veículo */}
          <g transform={`translate(${pos.x} ${pos.y})`}>
            <circle r="18" fill="var(--gold)" fillOpacity="0.12">
              <animate attributeName="r" values="12;24;12" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="fill-opacity" values="0.22;0;0.22" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle r="7" fill="var(--gold)" stroke="var(--navy-950)" strokeWidth="2" />
          </g>
        </svg>

        <div className="pointer-events-none absolute left-3 top-3 rounded-lg border border-border bg-navy-950/85 px-3 py-2 backdrop-blur">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-steel">Agora em</p>
          <p className="text-xs text-ink">{rua}</p>
        </div>
        <div className="pointer-events-none absolute right-3 top-3 rounded-lg border border-border bg-navy-950/85 px-3 py-2 text-right backdrop-blur">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-steel">Percorrido</p>
          <p className="text-xs text-primary">
            {percorrido} / {rota.km.toLocaleString("pt-BR")} km
          </p>
        </div>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-150"
          style={{ width: `${t * 100}%` }}
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          ["Velocidade", `${velocidade} km/h`],
          ["Ignição", bloqueado ? "Bloqueada" : "Ligada"],
          ["Status", bloqueado ? "Central acionada" : "Em trajeto"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-navy-950/60 p-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-steel">{k}</p>
            <p className={`mt-1 text-sm ${bloqueado ? "text-primary" : "text-ink"}`}>{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setBloqueado((b) => !b)}
          aria-pressed={bloqueado}
          className={`h-12 w-full rounded-xl font-display text-sm uppercase tracking-wide transition ${
            bloqueado
              ? "bg-primary text-primary-foreground shadow-[var(--shadow-gold)]"
              : "border border-border text-white hover:border-primary/70 hover:bg-primary/5"
          }`}
        >
          {bloqueado ? "Veículo bloqueado · liberar" : "Simular bloqueio remoto"}
        </button>
        <button
          type="button"
          onClick={() => {
            setT(0);
            setBloqueado(false);
          }}
          className="h-12 w-full rounded-xl border border-border font-display text-sm uppercase tracking-wide text-mist transition hover:border-primary/70 hover:text-white"
        >
          Reiniciar trajeto
        </button>
      </div>
      <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-steel">
        Demonstração interativa do app Sargento
      </p>
    </div>
  );
}
