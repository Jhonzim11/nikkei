
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/shared/ProductCard';
import { Product } from '../types';

const StorePage: React.FC = () => {
  const { products } = useProducts();
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
  });
  const [sortBy, setSortBy] = useState('name-asc');

  const categories = useMemo(() => ['all', ...Array.from(new Set(products.map(p => p.category)))], [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const categoryMatch = filters.category === 'all' || product.category === filters.category;
      const searchMatch = product.name.toLowerCase().includes(filters.search.toLowerCase());
      return categoryMatch && searchMatch;
    });

    switch (sortBy) {
        case 'price-asc':
            filtered.sort((a, b) => {
                const priceA = a.promotionalPrice ?? a.price;
                const priceB = b.promotionalPrice ?? b.price;
                return priceA - priceB;
            });
            break;
        case 'price-desc':
            filtered.sort((a, b) => {
                const priceA = a.promotionalPrice ?? a.price;
                const priceB = b.promotionalPrice ?? b.price;
                return priceB - priceA;
            });
            break;
        case 'name-asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            break;
    }

    return filtered;
  }, [products, filters, sortBy]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({...prev, [name]: value}));
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <header className="text-center mb-12">
        <h1 className="text-3xl font-display font-bold text-primary-500">Nossa Loja</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Equipamentos e acessórios para sua melhor performance.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input 
          type="text"
          name="search"
          placeholder="Buscar produto..."
          value={filters.search}
          onChange={handleFilterChange}
          className="w-full md:w-1/3 p-2 border border-light-border dark:border-dark-border rounded-md bg-light-card dark:bg-dark-card focus:ring-2 focus:ring-primary-500 outline-none"
        />
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="w-full md:w-1/4 p-2 border border-light-border dark:border-dark-border rounded-md bg-light-card dark:bg-dark-card focus:ring-2 focus:ring-primary-500 outline-none"
        >
          {categories.map(cat => (
            <option key={cat} value={cat} className="capitalize">{cat === 'all' ? 'Todas as Categorias' : cat}</option>
          ))}
        </select>
        <select
          name="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full md:w-1/4 p-2 border border-light-border dark:border-dark-border rounded-md bg-light-card dark:bg-dark-card focus:ring-2 focus:ring-primary-500 outline-none"
        >
          <option value="name-asc">Ordenar por: Nome (A-Z)</option>
          <option value="name-desc">Ordenar por: Nome (Z-A)</option>
          <option value="price-asc">Ordenar por: Preço (Menor)</option>
          <option value="price-desc">Ordenar por: Preço (Maior)</option>
        </select>
      </div>

      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
      >
        {filteredAndSortedProducts.map(product => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default StorePage;