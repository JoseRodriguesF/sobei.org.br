// Mock Database for SOBEI main website

export const projectsData = {
  'ccinter': {
    title: 'CCINTER - Centro de Convivência Intergeracional',
    tagline: 'Promovendo a convivência e o fortalecimento de vínculos entre gerações.',
    image: '/images/WhatsApp Image 2026-06-19 at 11.45.44.jpeg',
    description: 'O Centro de Convivência Intergeracional (CCINTER) é um serviço social voltado para acolher crianças, jovens, adultos e idosos. O objetivo principal é promover a troca de experiências, fortalecer vínculos familiares e comunitários, além de prevenir situações de exclusão e isolamento social.',
    benefits: [
      'Atividades intergeracionais (artes, música, teatro)',
      'Acompanhamento psicossocial e comunitário',
      'Oficinas de estimulação cognitiva para idosos',
      'Atividades esportivas e recreativas adaptadas'
    ],
    ageGroup: 'Crianças, Jovens, Adultos e Idosos',
    units: ['Araucárias', 'Cedro', 'Oliveiras', 'Macaúbas']
  },
  'cedesp': {
    title: 'CEDESP - Centro de Desenvolvimento Social e Produtivo',
    tagline: 'Qualificação profissional gratuita e preparação para o mercado de trabalho.',
    image: '/images/WhatsApp Image 2026-06-19 at 11.47.45.jpeg',
    description: 'O Centro de Desenvolvimento Social e Produtivo (CEDESP) oferece cursos de formação profissional básica e desenvolvimento de competências pessoais. O serviço prepara jovens de 15 a 59 anos para o ingresso no mercado de trabalho e incentiva o empreendedorismo.',
    benefits: [
      'Cursos certificados gratuitos (Administração, Logística, Tecnologia)',
      'Orientação profissional e auxílio na elaboração de currículos',
      'Parcerias com empresas para contratação de Jovem Aprendiz',
      'Oficinas de cidadania e desenvolvimento socioemocional'
    ],
    ageGroup: 'Jovens e Adultos (15 a 59 anos)',
    units: ['Montanaro', 'Leblon', 'Imbuias', 'Acácias']
  },
  'nci-imbuias': {
    title: 'NCI - Núcleo de Convivência de Idosos Imbuias',
    tagline: 'Qualidade de vida, saúde e bem-estar na melhor idade.',
    image: '/images/WhatsApp Image 2026-06-19 at 11.47.52.jpeg',
    description: 'O Núcleo de Convivência de Idosos (NCI) oferece atividades planejadas especialmente para a terceira idade. O foco está na promoção do envelhecimento ativo e saudável, estimulando a autonomia, a socialização e a participação cidadã dos idosos da comunidade.',
    benefits: [
      'Aulas de ginástica funcional, alongamento e yoga',
      'Oficinas de artesanato, costura e pintura',
      'Atendimento e acompanhamento com assistente social',
      'Palestras sobre direitos dos idosos, saúde e nutrição'
    ],
    ageGroup: 'Idosos (a partir de 60 anos)',
    units: ['Ipês', 'Bela Vista']
  },
  'telecentro': {
    title: 'Telecentro - Inclusão Digital para Todos',
    tagline: 'Acesso gratuito à internet e capacitação em ferramentas digitais.',
    image: '/images/WhatsApp Image 2026-06-19 at 11.48.12.jpeg',
    description: 'O Telecentro é um ponto de acesso público e gratuito à internet, oferecendo computadores para uso da comunidade e cursos de informática básica. O objetivo é reduzir a exclusão digital e facilitar o acesso a serviços eletrônicos, governamentais e de pesquisa.',
    benefits: [
      'Acesso livre à internet para pesquisas e estudos',
      'Cursos de informática básica (Windows, Word, Excel, Internet)',
      'Oficinas de uso de celulares e aplicativos do cotidiano',
      'Orientação para agendamento de serviços públicos online'
    ],
    ageGroup: 'Livre para todas as idades',
    units: ['Orquídeas', 'Jacomo']
  }
};

export const unitsData = {
  'araucarias': {
    name: 'Unidade Araucárias',
    address: 'Rua das Araucárias, 120 - Grajaú, São Paulo - SP',
    phone: '(11) 5661-1200',
    email: 'araucarias@sobei.org.br',
    type: 'CEI / CCINTER',
    capacity: '150 atendidos',
    description: 'A Unidade Araucárias atende a comunidade do Grajaú oferecendo educação infantil (CEI) e projetos de convivência intergeracional (CCINTER) no período contraturno, promovendo acolhimento humanizado.',
    image: '/images/WhatsApp Image 2026-06-19 at 11.47.44.jpeg'
  },
  'cedro': {
    name: 'Unidade Cedro',
    address: 'Estrada do Cedro, 450 - Parelheiros, São Paulo - SP',
    phone: '(11) 5662-4500',
    email: 'cedro@sobei.org.br',
    type: 'CEI / CCINTER',
    capacity: '200 atendidos',
    description: 'Localizada no distrito de Parelheiros, a Unidade Cedro destaca-se por projetos de integração com a natureza e forte envolvimento comunitário nas oficinas pedagógicas de contraturno.',
    image: '/images/WhatsApp Image 2026-06-19 at 11.47.45.jpeg'
  },
  'oliveiras': {
    name: 'Unidade Oliveiras',
    address: 'Av. das Oliveiras, 900 - Jardim Primavera, São Paulo - SP',
    phone: '(11) 5663-9000',
    email: 'oliveiras@sobei.org.br',
    type: 'CEI / CCINTER',
    capacity: '180 atendidos',
    description: 'A Unidade Oliveiras foca na primeira infância e no apoio psicossocial a famílias, desenvolvendo projetos lúdicos voltados à música e artes plásticas.',
    image: '/images/WhatsApp Image 2026-06-19 at 11.47.52.jpeg'
  },
  'macaubas': {
    name: 'Unidade Macaúbas',
    address: 'Rua Macaúbas, 55 - Cidade Dutra, São Paulo - SP',
    phone: '(11) 5664-0055',
    email: 'macaubas@sobei.org.br',
    type: 'CEI / CCINTER',
    capacity: '140 atendidos',
    description: 'Uma unidade histórica localizada na Cidade Dutra, com infraestrutura moderna para recreação infantil e horta comunitária ativa administrada pelos participantes.',
    image: '/images/WhatsApp Image 2026-06-19 at 11.48.12.jpeg'
  },
  'montanaro': {
    name: 'Unidade Montanaro',
    address: 'Av. Senador Teotônio Vilela, 3100 - Interlagos, São Paulo - SP',
    phone: '(11) 5665-3100',
    email: 'montanaro@sobei.org.br',
    type: 'CEI / CEDESP',
    capacity: '320 alunos',
    description: 'A Unidade Montanaro é um dos grandes polos de qualificação do CEDESP, com laboratórios modernos de informática e salas voltadas para cursos administrativos e técnicos.',
    image: '/images/WhatsApp Image 2026-06-19 at 11.48.13.jpeg'
  },
  'leblon': {
    name: 'Unidade Leblon',
    address: 'Rua Leblon, 230 - Veleiros, São Paulo - SP',
    phone: '(11) 5666-2300',
    email: 'leblon@sobei.org.br',
    type: 'CEDESP',
    capacity: '240 alunos',
    description: 'Focada exclusivamente na formação profissional técnica, a Unidade Leblon mantém convênio com importantes indústrias e empresas para fomento a vagas de Jovem Aprendiz.',
    image: '/images/WhatsApp Image 2026-06-19 at 11.48.14.jpeg'
  },
  'imbuias': {
    name: 'Unidade Imbuias',
    address: 'Estrada das Imbuias, 1500 - Grajaú, São Paulo - SP',
    phone: '(11) 5667-1500',
    email: 'imbuias@sobei.org.br',
    type: 'CEI / CEDESP',
    capacity: '280 alunos',
    description: 'Atua fortemente na capacitação de jovens na área de tecnologia e programação de computadores, além de manter um berçário integral qualificado.',
    image: '/images/WhatsApp Image 2026-06-19 at 11.47.41.jpeg'
  },
  'acacias': {
    name: 'Unidade Acácias',
    address: 'Rua das Acácias, 80 - Cocaia, São Paulo - SP',
    phone: '(11) 5668-0080',
    email: 'acacias@sobei.org.br',
    type: 'CEI / CEDESP',
    capacity: '190 alunos',
    description: 'A Unidade Acácias realiza projetos educacionais criativos e estimula cursos de economia criativa e artesanato voltados à geração de renda imediata.',
    image: '/images/WhatsApp Image 2026-06-19 at 11.47.44.jpeg'
  },
  'ipes': {
    name: 'Unidade Ipês',
    address: 'Av. dos Ipês, 45 - Jardim Cliper, São Paulo - SP',
    phone: '(11) 5669-0045',
    email: 'ipes@sobei.org.br',
    type: 'CEI / NCI',
    capacity: '120 idosos',
    description: 'O polo de convivência do NCI Cliper abriga salas de jogos, ginásio para pilates e espaço cultural onde são realizados bailes e mostras artísticas da terceira idade.',
    image: '/images/WhatsApp Image 2026-06-19 at 11.47.45.jpeg'
  },
  'bela-vista': {
    name: 'Unidade Bela Vista',
    address: 'Rua Bela Vista, 310 - Capela do Socorro, São Paulo - SP',
    phone: '(11) 5670-0310',
    email: 'belavista@sobei.org.br',
    type: 'CEI / NCI',
    capacity: '100 idosos',
    description: 'Focado em atividades físicas preventivas e lazer para a melhor idade. Possui consultório para triagem psicossocial e acompanhamento geriátrico primário.',
    image: '/images/WhatsApp Image 2026-06-19 at 11.47.48.jpeg'
  },
  'orquideas': {
    name: 'Unidade Orquídeas',
    address: 'Rua das Orquídeas, 99 - Interlagos, São Paulo - SP',
    phone: '(11) 5671-0099',
    email: 'orquideas@sobei.org.br',
    type: 'CEI / Telecentro',
    capacity: '300 usuários/mês',
    description: 'A Unidade Orquídeas abriga um dos mais ativos Telecentros da SOBEI, com mais de 20 computadores para livre navegação da comunidade local.',
    image: '/images/WhatsApp Image 2026-06-19 at 11.47.52.jpeg'
  },
  'jacomo': {
    name: 'Unidade Jacomo',
    address: 'Av. Jacomo Tatto, 880 - Jardim São José, São Paulo - SP',
    phone: '(11) 5672-0880',
    email: 'jacomo@sobei.org.br',
    type: 'CEI / Telecentro',
    capacity: '250 usuários/mês',
    description: 'Atende o Jardim São José proporcionando cursos de informática e capacitação em desenvolvimento web, além do suporte básico na educação infantil.',
    image: '/images/WhatsApp Image 2026-06-19 at 11.48.12.jpeg'
  }
};

export const jobsData = [
  {
    id: 1,
    title: 'Analista de Qualidade',
    department: 'Qualidade',
    location: 'Unidade Imbuias (Grajaú)',
    model: 'Presencial',
    type: 'CLT',
    description: 'Buscamos Analista de Qualidade para realizar auditorias internas, mapeamento de processos, e controle de indicadores nas unidades da SOBEI, visando a melhoria contínua dos serviços assistenciais.',
    requirements: [
      'Graduação em Administração, Engenharia ou áreas correlatas',
      'Conhecimento de ferramentas de qualidade (PDCA, Ishikawa, 5S)',
      'Experiência prévia em auditorias de processos ou gestão de qualidade',
      'Habilidade analítica e comunicação assertiva'
    ],
    benefits: 'Vale Transporte, Vale Refeição, Plano de Saúde e Odontológico coparticipativo.'
  },
  {
    id: 2,
    title: 'Analista de Qualidade',
    department: 'Qualidade',
    location: 'Unidade Imbuias (Grajaú)',
    model: 'Presencial',
    type: 'CLT',
    description: 'Buscamos Analista de Qualidade para realizar auditorias internas, mapeamento de processos, e controle de indicadores nas unidades da SOBEI, visando a melhoria contínua dos serviços assistenciais.',
    requirements: [
      'Graduação em Administração, Engenharia ou áreas correlatas',
      'Conhecimento de ferramentas de qualidade (PDCA, Ishikawa, 5S)',
      'Experiência prévia em auditorias de processos ou gestão de qualidade',
      'Habilidade analítica e comunicação assertiva'
    ],
    benefits: 'Vale Transporte, Vale Refeição, Plano de Saúde e Odontológico coparticipativo.'
  },
  {
    id: 3,
    title: 'Analista de Qualidade',
    department: 'Qualidade',
    location: 'Unidade Imbuias (Grajaú)',
    model: 'Presencial',
    type: 'CLT',
    description: 'Buscamos Analista de Qualidade para realizar auditorias internas, mapeamento de processos, e controle de indicadores nas unidades da SOBEI, visando a melhoria contínua dos serviços assistenciais.',
    requirements: [
      'Graduação em Administração, Engenharia ou áreas correlatas',
      'Conhecimento de ferramentas de qualidade (PDCA, Ishikawa, 5S)',
      'Experiência prévia em auditorias de processos ou gestão de qualidade',
      'Habilidade analítica e comunicação assertiva'
    ],
    benefits: 'Vale Transporte, Vale Refeição, Plano de Saúde e Odontológico coparticipativo.'
  },
  {
    id: 4,
    title: 'Educador Social',
    department: 'Pedagógico',
    location: 'Unidade Imbuias (Grajaú)',
    model: 'Presencial',
    type: 'CLT',
    description: 'Estamos contratando Educador Social para ministrar oficinas lúdicas e socioeducativas voltadas ao público jovem do CEDESP. O profissional conduzirá dinâmicas de cidadania, ética e introdução ao mercado de trabalho.',
    requirements: [
      'Graduação em Pedagogia, Psicologia ou Assistência Social',
      'Experiência mínima de 1 ano com projetos sociais ou terceiro setor',
      'Boa comunicação verbal e capacidade de lidar com jovens em situação de vulnerabilidade',
      'Residir na zona sul de São Paulo será considerado um diferencial'
    ],
    benefits: 'Vale Transporte, Vale Refeição, Convênio Médico e Odontológico coparticipativo.'
  },
  {
    id: 5,
    title: 'Auxiliar Administrativo',
    department: 'Administrativo',
    location: 'Unidade Montanaro (Interlagos)',
    model: 'Presencial',
    type: 'CLT',
    description: 'O Auxiliar Administrativo será responsável pela recepção de alunos do CEDESP, controle de planilhas de chamadas, arquivo físico, atendimento telefônico e auxílio geral nas demandas da diretoria da unidade.',
    requirements: [
      'Ensino Médio completo (desejável cursando superior em Administração ou afins)',
      'Conhecimento intermediário do pacote Office (principalmente Excel e Word)',
      'Perfil organizado, proativo e acolhedor para lidar com o público',
      'Disponibilidade para trabalhar em horário comercial'
    ],
    benefits: 'Vale Transporte, Cesta Básica, Assistência Médica e Odontológica.'
  },
  {
    id: 6,
    title: 'Nutricionista',
    department: 'Saúde / Nutrição',
    location: 'Unidade Araucárias',
    model: 'Híbrido',
    type: 'CLT',
    description: 'O Nutricionista planejará cardápios infantis equilibrados para as creches (CEIs) administradas, realizará visitas técnicas semanais às cozinhas, treinará a equipe de merendeiras e conduzirá avaliações nutricionais periódicas.',
    requirements: [
      'Graduação completa em Nutrição com registro ativo no CRN',
      'Especialização ou experiência comprovada em nutrição escolar infantil',
      'Conhecimento das normas de vigilância sanitária (ANVISA)',
      'Disponibilidade para deslocamento entre unidades da zona sul'
    ],
    benefits: 'Vale Alimentação, Vale Refeição, Plano de Saúde integral.'
  },
  {
    id: 7,
    title: 'Instrutor de Informática',
    department: 'Tecnologia',
    location: 'Unidade Jacomo (Telecentro)',
    model: 'Presencial',
    type: 'CLT',
    description: 'Responsável por ministrar aulas de informática básica (Windows, Office) e introdução à internet para turmas compostas por crianças e idosos. Orientará o uso livre do Telecentro e auxiliará a comunidade em demandas digitais.',
    requirements: [
      'Formação técnica ou cursando superior em Sistemas de Informação ou áreas de TI',
      'Facilidade de didática para ensino de pessoas com pouca alfabetização digital',
      'Conhecimento técnico de manutenção básica de redes e computadores',
      'Boa relação interpessoal'
    ],
    benefits: 'Vale Transporte, Vale Refeição, Seguro de Vida, Convênio Médico.'
  }
];
