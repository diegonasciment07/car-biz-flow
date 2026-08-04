ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS install_mode text,
  ADD COLUMN IF NOT EXISTS endereco text,
  ADD COLUMN IF NOT EXISTS docs_confirmados boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS observacoes text;

DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;

CREATE POLICY "Anyone can submit a lead"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(nome) >= 2 AND char_length(nome) <= 120
  AND char_length(telefone) >= 8 AND char_length(telefone) <= 30
  AND (email IS NULL OR char_length(email) <= 255)
  AND (marca IS NULL OR char_length(marca) <= 80)
  AND (modelo IS NULL OR char_length(modelo) <= 80)
  AND (install_mode IS NULL OR install_mode IN ('local','loja'))
  AND (endereco IS NULL OR char_length(endereco) <= 300)
  AND (observacoes IS NULL OR char_length(observacoes) <= 500)
);