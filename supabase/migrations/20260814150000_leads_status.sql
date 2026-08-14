-- Status de atendimento do lead, usado pelo painel interno (/painel).
-- Acesso ao painel passa por senha compartilhada + service_role (bypassa RLS),
-- então não precisa de policy nova aqui — só a coluna.
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'novo'
  CHECK (status IN ('novo', 'contatado', 'convertido'));
