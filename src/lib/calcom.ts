/**
 * Integração Cal.com — agendamento da instalação.
 *
 * COMO CONECTAR A CONTA DO CLIENTE (1 passo):
 * Preencha CAL_LINK com o link público do evento no Cal.com,
 * no formato "usuario/evento" (ex.: "sargentorastreamento/instalacao").
 * Enquanto estiver vazio, a página mostra o estado "agenda em configuração"
 * e o cliente é direcionado ao WhatsApp — nada quebra.
 */
export const CAL_LINK: string = "";

/** Duração/rótulo exibidos no bloco de agenda. */
export const CAL_EVENT_LABEL = "Instalação do rastreador";

export type CalPrefill = {
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
};

export function calEmbedUrl(prefill: CalPrefill = {}) {
  if (!CAL_LINK) return null;
  const url = new URL(`https://cal.com/${CAL_LINK.replace(/^\/+/, "")}`);
  url.searchParams.set("embed", "true");
  url.searchParams.set("theme", "dark");
  if (prefill.name) url.searchParams.set("name", prefill.name);
  if (prefill.email) url.searchParams.set("email", prefill.email);
  if (prefill.phone) url.searchParams.set("smsReminderNumber", prefill.phone);
  if (prefill.notes) url.searchParams.set("notes", prefill.notes);
  return url.toString();
}

export const DOCUMENTOS = [
  "Habilitação (CNH) ou documento de identidade",
  "E-mail válido para envio do acesso ao app",
  "Comprovante de residência atualizado",
] as const;

export const ENDERECO_LOJA = "Av. Cel Sávio Belota, 30, Novo Aleixo, Manaus/AM";
