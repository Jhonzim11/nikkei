
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from '../shared/FloatingWhatsApp';
import ScrollToTop from '../shared/ScrollToTop';
import CartSidebar from '../shared/CartSidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-light-text dark:text-dark-text">
      <Navbar />
      <main className="flex-grow pt-16"> 
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
      <CartSidebar />
    </div>
  );
};

export default Layout;
