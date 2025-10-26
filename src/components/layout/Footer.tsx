import React from 'react';
import { NavLink } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo e slogan */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-display font-bold text-primary-500">Nikkei Tênis e Beach</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Viva o esporte. Sinta a energia Nikkei!</p>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.instagram.com/tennisbeach_nikkei/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500">
                <Instagram size={20}/>
              </a>
              <a href="https://www.facebook.com/nikkeicuritiba/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500">
                <Facebook size={20}/>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500"><Twitter size={20}/></a>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="font-semibold tracking-wider uppercase">Navegação</h3>
            <ul className="mt-4 space-y-2">
              <li><NavLink to="/" className="hover:text-primary-500">Home</NavLink></li>
              <li><NavLink to="/professores" className="hover:text-primary-500">Professores</NavLink></li>
              <li><NavLink to="/modalidades" className="hover:text-primary-500">Modalidades</NavLink></li>
              <li><NavLink to="/loja" className="hover:text-primary-500">Loja</NavLink></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:text-primary-500">Termos de Serviço</a></li>
              <li><a href="#" className="hover:text-primary-500">Política de Privacidade</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold tracking-wider uppercase">Contato</h3>
            <ul className="mt-4 space-y-2 text-gray-500 dark:text-gray-400">
              <li>
                <a href="https://goo.gl/maps/XYZ123" target="_blank" rel="noopener noreferrer">
                  R. Padre Júlio Saavedra, 598 - Uberaba, Curitiba - PR, 81570-180
                </a>
              </li>
              <li><a href="tel:+554132774123">(41) 3277-4123</a></li>
              <li><a href="mailto:contato@nikkeiclub.com">contato@nikkeiclub.com</a></li>
            </ul>
          </div>

        </div>

        {/* Direitos */}
        <div className="mt-8 pt-8 border-t border-light-border dark:border-dark-border text-center text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Clube Nikkei Tênis e Beach. Todos os direitos reservados.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
