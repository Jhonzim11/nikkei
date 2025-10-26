import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { Product } from '../types';
import { products as initialProducts } from '../data/db';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useCart } from './CartContext';

interface ProductContextProps {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useLocalStorage<Product[]>('managed_products', initialProducts);
  const { removeFromCart } = useCart();

  const addProduct = useCallback((productData: Omit<Product, 'id'>) => {
    setProducts(prevProducts => {
      const newProduct: Product = {
        ...productData,
        id: Math.max(0, ...prevProducts.map(p => p.id)) + 1,
      };
      return [...prevProducts, newProduct];
    });
  }, [setProducts]);

  const updateProduct = useCallback((updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  }, [setProducts]);

  const deleteProduct = useCallback((productId: number) => {
    // Garante a consistência dos dados removendo o produto de estados relacionados primeiro.
    removeFromCart(productId);
    
    // Em seguida, atualiza a lista principal de produtos.
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  }, [setProducts, removeFromCart]);

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};