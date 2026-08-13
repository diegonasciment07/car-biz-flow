export const WHATSAPP_NUMBER = "5592993294007";
export const WHATSAPP_DISPLAY = "(92) 99329-4007";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_DEFAULT = whatsappLink(
  "Quero saber mais sobre o rastreamento veicular da Sargento",
);

export const PRECO_MENSAL = "R$49,90";
export const TAXA_INSTALACAO = "R$50,00";
export const CLIENTES_ATIVOS = 500;

export const EMPRESA = {
  razaoSocial: "Sargento Rastreamento e Locação Veicular Ltda",
  nomeFantasia: "Sargento Rastreamento Veicular",
  cnpj: "54.045.593/0001-31",
  endereco: "Av. Cel Sávio Belota, 30, Novo Aleixo, Manaus/AM, CEP 69098-270",
  email: "sargentorastreamento@icloud.com",
  instagram: "https://www.instagram.com/sargentorastreamento/",
} as const;

export const RECURSOS = [
  { titulo: "Rastreio em tempo real", desc: "Posição do veículo atualizada continuamente, no app e na web." },
  { titulo: "Bloqueio remoto", desc: "Corte de combustível/ignição acionado pela central em caso de furto." },
  { titulo: "App mobile próprio", desc: "Aplicativo da Sargento para Android e iOS, não é plataforma genérica." },
  { titulo: "Plataforma web", desc: "Painel completo no computador, com histórico e relatórios de trajeto." },
  { titulo: "Disk emergência", desc: "Central de resgate e assistência 24h que atua quando você aciona." },
  { titulo: "Cerca virtual", desc: "Alerta automático quando o veículo entra ou sai de uma área definida." },
  { titulo: "Hodômetro", desc: "Controle de quilometragem rodada para manutenção e gestão de frota." },
  { titulo: "Controle de velocidade", desc: "Aviso de excesso de velocidade, ideal para frota e motorista jovem." },
] as const;

export const FAQ = [
  {
    q: "A Sargento Rastreamento é confiável ou some depois que eu pagar a instalação?",
    a: `Não é promessa, é número: mais de ${CLIENTES_ATIVOS} clientes ativos e satisfeitos em Manaus, com central de resgate 24h em operação todos os dias.`,
  },
  {
    q: "Rastreador não impede o roubo, só localiza depois. Ainda assim vale o valor mensal?",
    a: "Verdade, rastreador não impede o roubo, mas é o que decide se você recupera o carro ou fica só com o boletim. Com rastreador, a chance de recuperação passa de 90%. A central de resgate 24h já bloqueia e aciona por você na hora, e o rastreador ainda pode reduzir o valor do seu seguro em até 20%.",
  },
  {
    q: "Já vi rastreamento mais barato em Manaus. Por que contratar a Sargento?",
    a: `${PRECO_MENSAL}/mês, mais uma taxa única de ${TAXA_INSTALACAO} pela instalação de um equipamento de alta precisão e confiança no rastreio. Sem cobranças escondidas. O que separa uma empresa de rastreamento de outra não é quem cobra R$5 a menos, e sim a precisão do equipamento e quem atende quando você mais precisa, inclusive às 2h da manhã.`,
  },
  {
    q: "Nunca ouvi falar da Sargento. Os concorrentes parecem mais estabelecidos.",
    a: `Tempo de logo na praça não recupera carro roubado. Atendimento sim. São mais de ${CLIENTES_ATIVOS} clientes ativos agora, resgate 24h funcionando agora e controle pelo app funcionando agora.`,
  },
] as const;

export const PLANOS = [
  {
    nome: "Moto",
    tag: "Duas rodas",
    itens: ["Rastreio", "Bloqueio remoto", "App mobile", "Plataforma web", "Disk emergência", "Cerca virtual", "Hodômetro", "Controle de velocidade"],
    destaque: false,
  },
  {
    nome: "Carro",
    tag: "Mais contratado",
    itens: ["Rastreio", "Bloqueio remoto", "App mobile", "Plataforma web", "Disk emergência", "Cerca virtual", "Hodômetro", "Controle de velocidade"],
    destaque: true,
  },
  {
    nome: "Veículos pesados",
    tag: "Frota e caminhão",
    itens: ["Rastreio", "Bloqueio remoto", "App mobile", "Plataforma web", "Disk emergência", "Controle de velocidade"],
    destaque: false,
  },
] as const;

export const MARCAS = [
  "Chevrolet", "Fiat", "Ford", "Honda", "Hyundai", "Jeep", "Nissan", "Peugeot",
  "Renault", "Toyota", "Volkswagen", "Mitsubishi", "BMW", "Mercedes-Benz",
  "Yamaha", "Suzuki", "Scania", "Volvo", "Iveco", "Outra",
] as const;
