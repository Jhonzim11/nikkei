import { Product, Teacher, Modality, Testimonial } from '../types';

export const products: Product[] = [
  { id: 101, name: 'Raquete Pro Staff', category: 'Raquetes', price: 899.90, imageUrl: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRTPR-nXjJp1JaZ9prkcJyelhr85tVzxsWBu4-cwyAXwPbsriyhA-xysXxCW7aQmBje3S7WNmxptCi1o4rxJfylFN4bkwXVRI-x0uaSXTG9bTFSkPDZIEP3-g', rating: 5, reviewCount: 128, tags: ['Novo'], description: 'A raquete de escolha dos profissionais, a Pro Staff oferece controle e sensibilidade incomparáveis. Construída com grafite trançado para uma sensação pura e clássica. Ideal para jogadores de nível avançado que buscam precisão em cada golpe.' },
  { id: 102, name: 'Tênis Court Master', category: 'Calçados', price: 499.50, imageUrl: '/images/products/tenis-court-master.jpg', rating: 4.5, reviewCount: 97, tags: [], description: 'Desenvolvido para máxima performance em quadras de saibro, o Court Master oferece estabilidade, conforto e durabilidade. Sua sola com padrão espinha de peixe garante a tração ideal para movimentos rápidos e seguros.' },
  { id: 103, name: 'Bolas de Tênis Pro (Tubo)', category: 'Bolas', price: 45.00, promotionalPrice: 39.90, imageUrl: '/images/products/bolas-tenis-pro.jpg', rating: 4.8, reviewCount: 250, tags: ['Promoção'], description: 'Tubo com 3 bolas de tênis de alta performance, aprovadas pela ITF. O feltro premium e o núcleo de borracha de alta qualidade garantem durabilidade e um quique consistente em todas as superfícies.' },
  { id: 104, name: 'Viseira Performance', category: 'Acessórios', price: 89.90, imageUrl: '/images/products/viseira-performance.jpg', rating: 4.2, reviewCount: 45, tags: [], description: 'Proteja-se do sol sem comprometer a ventilação. A Viseira Performance é feita com tecido tecnológico que absorve o suor, mantendo você seco e focado no jogo. Ajuste traseiro para um encaixe perfeito.' },
  { id: 105, name: 'Raquete Beach Storm', category: 'Raquetes', price: 650.00, imageUrl: '/images/products/raquete-beach-storm.jpg', rating: 4.9, reviewCount: 150, tags: ['Novo'], description: 'Domine a areia com a Raquete Beach Storm. Feita em fibra de carbono, ela combina potência e controle de forma excepcional. A superfície texturizada ajuda a aplicar mais efeito nos seus golpes.' },
  { id: 106, name: 'Camiseta Dry Fit Nikkei', category: 'Vestuário', price: 49.90, promotionalPrice: 35.00, imageUrl: '/images/products/camiseta-dry-fit.jpg', rating: 4.7, reviewCount: 88, tags: ['Promoção'], description: 'Leveza e respirabilidade para seus treinos. A Camiseta Dry Fit Nikkei afasta o suor da pele, proporcionando conforto térmico do início ao fim da partida. Design moderno com o logo do clube.' },
  { id: 107, name: 'Mochila Esportiva', category: 'Acessórios', price: 299.00, imageUrl: '/images/products/mochila-esportiva.jpg', rating: 4.6, reviewCount: 72, tags: [], description: 'Leve tudo que você precisa com estilo e organização. A Mochila Esportiva Nikkei possui compartimento térmico para raquetes, espaço para calçados e diversos bolsos para seus pertences. Alças acolchoadas para maior conforto.' },
  { id: 108, name: 'Overgrip Pro Comfort', category: 'Acessórios', price: 25.00, imageUrl: '/images/products/overgrip-pro-comfort.jpg', rating: 4.9, reviewCount: 310, tags: ['Esgotado'], description: 'Tenha a pegada perfeita com o Overgrip Pro Comfort. Oferece excelente absorção de suor e uma sensação macia e aderente, garantindo mais firmeza e confiança em seus golpes. Pacote com 3 unidades.' },
];

export const teachers: Teacher[] = [
    { 
        id: 201, 
        name: 'Ricardo Nunes', 
        slug: 'ricardo-nunes',
        specialty: 'Tênis - Avançado', 
        experience: 15, 
        avatarUrl: '/images/teachers/ricardo-nunes.jpg',
        bio: 'Ex-tenista profissional com 15 anos de experiência como treinador, Ricardo é especialista em técnicas avançadas e preparação para competições. Seu método foca em aprimorar a estratégia de jogo e a consistência dos golpes.',
        whatsapp: '5511999991111'
    },
    { 
        id: 202, 
        name: 'Juliana Paes', 
        slug: 'juliana-paes',
        specialty: 'Beach Tennis - Iniciante', 
        experience: 8, 
        avatarUrl: '/images/teachers/juliana-paes.jpg',
        bio: 'Com uma abordagem didática e motivadora, Juliana é a professora ideal para quem está começando no Beach Tennis. Suas aulas são dinâmicas e focadas em construir uma base sólida de fundamentos em um ambiente divertido.',
        whatsapp: '5511999992222'
    },
    { 
        id: 203, 
        name: 'Marcos Andrade', 
        slug: 'marcos-andrade',
        specialty: 'Tênis - Infantil', 
        experience: 10, 
        avatarUrl: '/images/teachers/marcos-andrade.jpg',
        bio: 'Especialista em psicomotricidade aplicada ao tênis, Marcos desenvolve as habilidades motoras e a paixão pelo esporte nas crianças. Sua metodologia lúdica garante o aprendizado enquanto os pequenos se divertem.',
        whatsapp: '5511999993333'
    },
    { 
        id: 204, 
        name: 'Fernanda Souza', 
        slug: 'fernanda-souza',
        specialty: 'Beach Tennis - Performance', 
        experience: 12, 
        avatarUrl: '/images/teachers/fernanda-souza.jpg',
        bio: 'Atleta e treinadora, Fernanda foca no desenvolvimento de jogadores de beach tennis que buscam alta performance. Seu treinamento intensivo abrange desde o preparo físico específico até táticas avançadas de duplas.',
        whatsapp: '5511999994444'
    },
];

export const modalities: Modality[] = [
    {
        id: 401,
        name: 'Tênis',
        description: 'Aulas e treinamento para todos os níveis e idades. Desenvolva sua técnica, tática e preparo físico nas nossas quadras de saibro.',
        imageUrl: '/images/modalities/tenis.jpg',
        pricing: [
            { plan: 'Aula Individual (avulsa)', price: 150.00 },
            { plan: 'Aula em Grupo (mensal)', price: 350.00 },
            { plan: 'Aula Individual (mensal)', price: 450.00 },
        ]
    },
    {
        id: 402,
        name: 'Beach Tennis',
        description: 'Sinta a energia da praia em nossas quadras de areia. Aulas dinâmicas para você aprender, evoluir e se divertir no esporte que mais cresce.',
        imageUrl: '/images/modalities/beach-tennis.jpg',
        pricing: [
            { plan: 'Aula Individual (avulsa)', price: 120.00 },
            { plan: 'Aula em Grupo (mensal)', price: 320.00 },
            { plan: 'Aula Individual (mensal)', price: 400.00 },
        ]
    },
];

export const testimonials: Testimonial[] = [
    { id: 301, name: 'Joana Santos', role: 'Aluno', avatarUrl: '/images/testimonials/joana-santos.jpg', comment: 'Os professores são incríveis! Melhorei meu jogo em poucos meses. A estrutura do clube é fantástica.', rating: 5 },
    { id: 302, name: 'Pedro Almeida', role: 'Sócio', avatarUrl: '/images/testimonials/pedro-almeida.jpg', comment: 'Adoro a comunidade e os torneios. As quadras estão sempre em perfeitas condições. Recomendo!', rating: 5 },
    { id: 303, name: 'Mariana Lima', role: 'Aluno', avatarUrl: '/images/testimonials/mariana-lima.jpg', comment: 'O ambiente é super acolhedor e familiar. Fiz muitos amigos aqui. As aulas de beach tennis são muito divertidas.', rating: 4 },
];
