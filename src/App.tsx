import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { ThemeProvider } from './contexts/ThemeProvider';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './contexts/ToastContext';
import { ProductProvider } from './contexts/ProductContext';


import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import StorePage from './pages/StorePage';
import TeachersPage from './pages/TeachersPage';
import TeacherProfilePage from './pages/TeacherProfilePage';
import ModalitiesPage from './pages/ModalitiesPage';
import AdminPage from './pages/AdminPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';


const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const providers = [
    ThemeProvider,
    ToastProvider,
    CartProvider,
    ProductProvider,
  ];

  return providers.reduceRight((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, <>{children}</>);
};

const PublicRoutes = () => (
    <Layout>
        <AnimatePresence mode="wait">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/professores" element={<TeachersPage />} />
                <Route path="/professores/:slug" element={<TeacherProfilePage />} />
                <Route path="/modalidades" element={<ModalitiesPage />} />
                <Route path="/loja" element={<StorePage />} />
                <Route path="/loja/:productId" element={<ProductDetailPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </AnimatePresence>
    </Layout>
);


function App(): React.ReactElement {
  return (
    <AppProviders>
      <HashRouter>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/*" element={<PublicRoutes />} />
        </Routes>
      </HashRouter>
    </AppProviders>
  );
}

export default App;