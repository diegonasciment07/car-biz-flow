// Sessão do painel interno de leads (/painel). Autenticação por senha única
// (PAINEL_PASSWORD), sem conta de usuário — adequado pra ferramenta interna
// de um dono só. A sessão em si é selada/criptografada pelo TanStack Start
// (useSession) com PAINEL_SESSION_SECRET, que nunca é digitado por humano.
//
// Tudo aqui é envolto em createServerOnlyFn: o compilador do TanStack Start
// substitui a implementação por um stub que lança erro no bundle do cliente,
// então este módulo pode ser importado normalmente por -functions.ts (que
// roda em ambos os lados) sem vazar `node:crypto`/`@tanstack/react-start/server`
// pro navegador.
import { createMiddleware, createServerOnlyFn } from "@tanstack/react-start";

const SESSION_NAME = "painel_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 dias

type PainelSessionData = {
  authenticated: boolean;
};

export const painelSession = createServerOnlyFn(async () => {
  const { useSession } = await import("@tanstack/react-start/server");
  const secret = process.env["PAINEL_SESSION_SECRET"];
  if (!secret || secret.length < 32) {
    throw new Error("PAINEL_SESSION_SECRET ausente ou curto demais (mínimo 32 caracteres).");
  }
  return useSession<PainelSessionData>({
    password: secret,
    name: SESSION_NAME,
    maxAge: MAX_AGE_SECONDS,
  });
});

export const verifyPainelPassword = createServerOnlyFn(async (candidate: string) => {
  const { timingSafeEqual } = await import("node:crypto");
  const expected = process.env["PAINEL_PASSWORD"];
  if (!expected) {
    throw new Error("PAINEL_PASSWORD não configurada.");
  }
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  // Tamanhos diferentes já denunciam a senha errada sem custar tempo extra;
  // a comparação em si é constant-time pra não vazar quantos chars bateram.
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
});

export const requirePainelSession = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const session = await painelSession();
    if (!session.data.authenticated) {
      throw new Error("Unauthorized: sessão do painel inválida ou expirada.");
    }
    return next();
  },
);
