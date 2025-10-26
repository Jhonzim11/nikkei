import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { cn } from '../../lib/utils';
import { NavLink } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const getTagClass = (tag: string) => {
    switch (tag) {
      case 'Novo': return 'bg-blue-500';
      case 'Promoção': return 'bg-red-500';
      case 'Esgotado': return 'bg-gray-500 rotate-[-20deg]';
      default: return 'bg-primary-500';
    }
  };

  return (
    <motion.div whileHover={{ y: -5 }} className="h-full">
      <Card className="h-full flex flex-col overflow-hidden relative group">
        {product.tags.length > 0 && (
          <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1">
            {product.tags.map(tag => (
              <span key={tag} className={cn("text-white text-xs font-bold px-2 py-1 rounded-full", getTagClass(tag))}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <NavLink to={`/loja/${product.id}`} className="flex-grow flex flex-col">
            <CardHeader className="p-0 border-b border-light-border dark:border-dark-border">
            <div className="aspect-square overflow-hidden">
                <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
            <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
            <CardTitle className="mt-1 text-base font-semibold">{product.name}</CardTitle>
            <div className="flex items-center mt-2">
                <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.round(product.rating) ? 'currentColor' : 'none'} />
                ))}
                </div>
                <span className="text-xs text-gray-500 ml-2">({product.reviewCount})</span>
            </div>
            </CardContent>
        </NavLink>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          {product.promotionalPrice && product.tags.includes('Promoção') ? (
            <div>
                <p className="text-lg font-bold text-red-500">
                    R$ {product.promotionalPrice.toFixed(2).replace('.', ',')}
                </p>
                <s className="text-sm text-gray-500 line-through">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                </s>
            </div>
          ) : (
            <p className="text-lg font-bold text-primary-500">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </p>
          )}
          <Button
            size="icon"
            onClick={() => addToCart(product)}
            disabled={product.tags.includes('Esgotado')}
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;