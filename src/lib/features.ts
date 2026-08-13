import {
  Gauge,
  Lock,
  Monitor,
  PhoneCall,
  Radar,
  ShieldCheck,
  Smartphone,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { PLANOS } from "@/lib/sargento";

const ICONS: LucideIcon[] = [Radar, Lock, Smartphone, Monitor, PhoneCall, ShieldCheck, Gauge, Zap];

export type Feature = { label: string; icon: LucideIcon };

/** Lista canônica de recursos com ícone, na mesma ordem/rótulos do plano "Carro" (que inclui todos os 8). */
export const FEATURES: Feature[] = PLANOS.find((p) => p.nome === "Carro")!.itens.map(
  (label, i) => ({ label, icon: ICONS[i]! }),
);
