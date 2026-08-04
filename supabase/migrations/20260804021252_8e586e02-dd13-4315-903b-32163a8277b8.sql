CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT,
  vehicle_type TEXT,
  marca TEXT,
  modelo TEXT,
  origem TEXT DEFAULT 'landing-page',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.leads TO anon;
GRANT INSERT ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
ON public.leads FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(nome) BETWEEN 2 AND 120
  AND char_length(telefone) BETWEEN 8 AND 30
  AND (email IS NULL OR char_length(email) <= 255)
  AND (marca IS NULL OR char_length(marca) <= 80)
  AND (modelo IS NULL OR char_length(modelo) <= 80)
);