import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  painelSession,
  requirePainelSession,
  verifyPainelPassword,
} from "@/lib/painel-session.server";

const loginSchema = z.object({ password: z.string().min(1) });

export const loginPainelFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => loginSchema.parse(data))
  .handler(async ({ data }) => {
    if (!(await verifyPainelPassword(data.password))) {
      throw new Error("Senha incorreta.");
    }
    const session = await painelSession();
    await session.update({ authenticated: true });
    return { ok: true as const };
  });

export const logoutPainelFn = createServerFn({ method: "POST" }).handler(async () => {
  const session = await painelSession();
  await session.clear();
  return { ok: true as const };
});

export const getLeadsFn = createServerFn({ method: "GET" })
  .middleware([requirePainelSession])
  .handler(async () => {
    // Import dinâmico: mantém a service role key fora do bundle do cliente
    // (route files e *.functions.ts são enviados pro client também).
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

const statusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["novo", "contatado", "convertido"]),
});

export const updateLeadStatusFn = createServerFn({ method: "POST" })
  .middleware([requirePainelSession])
  .validator((data: unknown) => statusSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("leads")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
