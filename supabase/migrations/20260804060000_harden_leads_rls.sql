-- Aperta a validação de entrada na policy de INSERT público de leads:
-- antes só checava tamanho, agora também valida formato (evita lixo/spam
-- estruturado inserido direto via API com a anon key, sem passar pela UI).

DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;

CREATE POLICY "Anyone can submit a lead"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(nome) >= 2 AND char_length(nome) <= 120
  AND telefone ~ '^[0-9()+\-\s]{8,30}$'
  AND (email IS NULL OR email ~ '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$')
  AND (marca IS NULL OR char_length(marca) <= 80)
  AND (modelo IS NULL OR char_length(modelo) <= 80)
  AND (vehicle_type IS NULL OR vehicle_type IN ('Carro', 'Moto', 'Caminhão / Frota'))
  AND (install_mode IS NULL OR install_mode IN ('local', 'loja'))
  AND (endereco IS NULL OR char_length(endereco) <= 300)
  AND (observacoes IS NULL OR char_length(observacoes) <= 500)
  AND (origem IS NULL OR char_length(origem) <= 60)
);

-- Defesa em profundidade: revoga explicitamente qualquer privilégio de
-- leitura/alteração/exclusão dos papéis públicos, mesmo que RLS já negue
-- por padrão sem policy (fica explícito e sobrevive a futuras migrations
-- que adicionem policies sem revisar os grants).
REVOKE SELECT, UPDATE, DELETE ON public.leads FROM anon, authenticated;
