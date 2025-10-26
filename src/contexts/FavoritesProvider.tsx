
import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

interface FavoritesContextProps {
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  removeFavorite: (productId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useLocalStorage<number[]>('favorites', []);
  const { addToast } = useToast();

  const toggleFavorite = useCallback((productId: number) => {
    const isCurrentlyFavorite = favorites.includes(productId);
    setFavorites(prev => 
      isCurrentlyFavorite
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
    if (isCurrentlyFavorite) {
        addToast('Removido dos favoritos!', 'info');
    } else {
        addToast('Adicionado aos favoritos!', 'success');
    }
  }, [setFavorites, favorites, addToast]);

  const removeFavorite = useCallback((productId: number) => {
    setFavorites(prev => prev.filter(id => id !== productId));
  }, [setFavorites]);

  const isFavorite = useCallback((productId: number) => {
    return favorites.includes(productId);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};