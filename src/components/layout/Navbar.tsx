import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ShoppingCart, Menu, X, Shield } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeProvider';
import { useCart } from '../../contexts/CartContext';

const navLinks = [
  { path: '/', name: 'Home' },
  { path: '/professores', name: 'Professores' },
  { path: '/modalidades', name: 'Modalidades' },
  { path: '/loja', name: 'Loja' },
];

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { cartCount, openCart } = useCart();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const activeLinkStyle = {
    color: '#F97316',
    fontWeight: '600',
  };

  const renderNavLinks = (isMobile: boolean) => (
    <nav className={`flex ${isMobile ? 'flex-col space-y-4 text-lg' : 'items-center space-x-6'}`}>
      {navLinks.map(link => (
        <NavLink
          key={link.path}
          to={link.path}
          onClick={closeMobileMenu}
          className="hover:text-primary-500 transition-colors"
          style={({ isActive }) => (isActive ? activeLinkStyle : {})}
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-lg shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="text-2xl font-display font-bold text-primary-500">
            Nikkei Club
          </NavLink>

          <div className="hidden md:flex items-center space-x-6">
            {renderNavLinks(false)}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <NavLink to={`/admin`} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Admin Panel">
                <Shield size={20} />
            </NavLink>
            <button onClick={openCart} className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Open shopping cart">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-primary-500 text-white text-xs font-bold text-center">
                  {cartCount}
                </span>
              )}
            </button>
            
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="p-2" aria-label="Open mobile menu">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {renderNavLinks(true)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;