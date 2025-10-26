import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { ArrowRight, Trophy, Users, MapPin } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { modalities } from '../data/db';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/shared/ProductCard';
import Testimonials from '../components/home/Testimonials';
import ModalityCard from '../components/shared/ModalityCard';

const HomePage: React.FC = () => {
  const { products } = useProducts();

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
      },
    },
  };
  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const animatedText = "Viva o esporte. Sinta a energia Nikkei.";

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] text-white flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/home/hero-background.jpg')" }}
        ></div>
        <div className="relative z-20 container mx-auto px-4">
          <motion.h1
            className="text-3xl md:text-5xl font-display font-extrabold tracking-tight"
            variants={sentence}
            initial="hidden"
            animate="visible"
          >
            {animatedText.split("").map((char, index) => (
              <motion.span key={char + "-" + index} variants={letter}>
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p 
            className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.5 }}
          >
            O melhor clube de Tênis e Beach Tennis do Paraná. Aulas, torneios, loja e uma comunidade vibrante esperam por você.
          </motion.p>
          <motion.div 
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.5 }}
          >
            <Button asChild>
              <NavLink to="/modalidades">
                Nossas Aulas <ArrowRight className="ml-2 h-5 w-5" />
              </NavLink>
            </Button>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black"
              onClick={handleScrollToAbout}
            >
              Conheça o Clube
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-light-background dark:bg-dark-background scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl font-display font-bold text-primary-500">Sobre o Nikkei Club</h2>
              <p className="mt-4 text-lg">Fundado em 1998, o Clube Nikkei nasceu da paixão pelo esporte e pela comunidade. Com uma infraestrutura de ponta e uma equipe de profissionais dedicados, nos tornamos referência em Tênis e Beach Tennis, promovendo saúde, competição e amizade.</p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center">
                      <Trophy className="mx-auto h-10 w-10 text-primary-500"/>
                      <p className="mt-2 font-semibold">Torneios Regulares</p>
                  </div>
                   <div className="text-center">
                      <Users className="mx-auto h-10 w-10 text-primary-500"/>
                      <p className="mt-2 font-semibold">Comunidade Ativa</p>
                  </div>
                   <div className="text-center">
                      <MapPin className="mx-auto h-10 w-10 text-primary-500"/>
                      <p className="mt-2 font-semibold">Localização Privilegiada</p>
                  </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <img src="/images/home/club-view.jpg" alt="Vista do Clube" className="rounded-2xl shadow-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modalities Section */}
      <section className="py-16 md:py-24 bg-light-card dark:bg-dark-card">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-center text-primary-500 mb-12">Nossas Modalidades</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {modalities.map(modality => (
                    <ModalityCard key={modality.id} modality={modality} />
                ))}
            </div>
             <div className="text-center mt-12">
                <Button asChild>
                  <NavLink to="/modalidades">Ver todas as modalidades <ArrowRight className="ml-2 h-5 w-5" /></NavLink>
                </Button>
            </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 bg-light-background dark:bg-dark-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-center text-primary-500 mb-12">Destaques da Loja</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
           <div className="text-center mt-12">
                <Button asChild>
                  <NavLink to="/loja">Ver todos os produtos <ArrowRight className="ml-2 h-5 w-5" /></NavLink>
                </Button>
            </div>
        </div>
      </section>

      <Testimonials />

      <section className="py-16 md:py-24 bg-light-card dark:bg-dark-card">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-display font-bold text-primary-500">Entre em Contato</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg">
               Tem alguma dúvida? Visite-nos ou envie uma mensagem. Estamos prontos para te receber!
              </p>
            <div className="mt-8">
                 {/* Endereço atualizado */}
              <p className="text-xl font-semibold">
                R. Padre Júlio Saavedra, 598 - Uberaba, Curitiba - PR, 81570-180
              </p>
            <p className="mt-2 text-lg">Segunda a Segunda: 07:00 - 22:00</p>

                {/* Botão com link real */}
            <Button 
                   className="mt-6" 
              onClick={() => window.location.href = "mailto:contato@nikkeiclub.com"}
             >
             Fale Conosco
              </Button>

              {/* Telefone clicável opcional */}
                  <p className="mt-4 text-lg">
                  Telefone: <a href="tel:+554132774123" className="text-primary-500">(41) 3277-4123</a>
               </p>
               </div>
        </div>
       </section>

    </motion.div>
  );
};

export default HomePage;