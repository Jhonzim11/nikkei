import React from 'react';
// FIX: Import Variants type from framer-motion to resolve type inference issue.
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { NavLink } from 'react-router-dom';

const CartSidebar: React.FC = () => {
  const { isCartOpen, closeCart, cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // FIX: Explicitly type sidebarVariants to ensure `transition.type` is correctly interpreted.
  const sidebarVariants: Variants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeCart}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-light-card dark:bg-dark-card z-50 flex flex-col"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-light-border dark:border-dark-border">
              <h2 className="text-xl font-semibold">Seu Carrinho</h2>
              <Button variant="ghost" size="icon" onClick={closeCart}>
                <X size={24} />
              </Button>
            </div>
            
            {cartItems.length === 0 ? (
              <div className="flex-grow flex items-center justify-center">
                <p className="text-gray-500">Seu carrinho está vazio.</p>
              </div>
            ) : (
              <div className="flex-grow overflow-y-auto p-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 mb-4">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">R$ {(item.promotionalPrice && item.tags.includes('Promoção') ? item.promotionalPrice : item.price).toFixed(2).replace('.',',')}</p>
                      <div className="flex items-center mt-2">
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={12}/></Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                         <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={12}/></Button>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={18} className="text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="p-4 border-t border-light-border dark:border-dark-border">
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total</span>
                  <span>R$ {totalPrice.toFixed(2).replace('.',',')}</span>
                </div>
                <Button size="lg" className="w-full" asChild onClick={closeCart}>
                    <NavLink to="/checkout">
                        Finalizar Pedido <ArrowRight className="ml-2 h-4 w-4" />
                    </NavLink>
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;