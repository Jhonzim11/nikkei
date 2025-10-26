import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Star, ShoppingCart, Share2, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const { products } = useProducts();
    const { addToCart } = useCart();
    const { addToast } = useToast();

    const product = products.find(p => p.id === Number(productId));

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-primary-500" />
                <h1 className="mt-4 text-2xl font-bold">Produto não encontrado</h1>
                <p className="mt-2 text-gray-500">O produto que você está procurando não existe ou foi removido.</p>
                <Button asChild className="mt-6">
                    <NavLink to="/loja">
                        <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para a Loja
                    </NavLink>
                </Button>
            </div>
        );
    }

    const handleShare = async () => {
        const baseUrl = window.location.href.split('#')[0];
        const shareUrl = `${baseUrl}#/loja/${product.id}`;

        const shareData = {
            title: product.name,
            text: `Confira este produto na Nikkei Club: ${product.name}`,
            url: shareUrl,
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareUrl);
                addToast('Link copiado para a área de transferência!', 'info');
            }
        } catch (err) {
            console.error('Error sharing:', err);
            addToast('Não foi possível compartilhar.', 'error');
        }
    };

    const getTagClass = (tag: string) => {
        switch (tag) {
          case 'Novo': return 'bg-blue-500';
          case 'Promoção': return 'bg-red-500';
          case 'Esgotado': return 'bg-gray-500';
          default: return 'bg-primary-500';
        }
    };
    

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
            <div className="mb-6 text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                <NavLink to="/" className="hover:text-primary-500">Home</NavLink>
                <ChevronRight size={16} />
                <NavLink to="/loja" className="hover:text-primary-500">Loja</NavLink>
                <ChevronRight size={16} />
                <span className="font-medium text-light-text dark:text-dark-text">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Image Section */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Card className="overflow-hidden">
                        <div className="aspect-square relative">
                             {product.tags.length > 0 && (
                                <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1.5">
                                    {product.tags.map(tag => (
                                    <span key={tag} className={cn("text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg", getTagClass(tag))}>
                                        {tag}
                                    </span>
                                    ))}
                                </div>
                            )}
                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                    </Card>
                </motion.div>

                {/* Details Section */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col"
                >
                    <p className="font-semibold text-primary-500">{product.category}</p>
                    <h1 className="text-3xl lg:text-4xl font-display font-bold mt-1">{product.name}</h1>
                    
                    <div className="flex items-center mt-3">
                        <div className="flex items-center text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={20} fill={i < Math.round(product.rating) ? 'currentColor' : 'none'} />
                            ))}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({product.reviewCount} avaliações)</span>
                    </div>

                    <div className="my-6">
                         {product.promotionalPrice && product.tags.includes('Promoção') ? (
                            <div className="flex items-baseline gap-3">
                                <p className="text-4xl font-bold text-red-500">
                                    R$ {product.promotionalPrice.toFixed(2).replace('.', ',')}
                                </p>
                                <s className="text-xl text-gray-500 line-through">
                                    R$ {product.price.toFixed(2).replace('.', ',')}
                                </s>
                            </div>
                        ) : (
                            <p className="text-4xl font-bold text-primary-500">
                            R$ {product.price.toFixed(2).replace('.', ',')}
                            </p>
                        )}
                    </div>

                    <Card className="bg-light-background dark:bg-dark-background border-dashed">
                        <CardHeader>
                            <CardTitle>Descrição do Produto</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
                        </CardContent>
                    </Card>
                    
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Button
                            size="lg"
                            onClick={() => addToCart(product)}
                            disabled={product.tags.includes('Esgotado')}
                        >
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            {product.tags.includes('Esgotado') ? 'Produto Esgotado' : 'Adicionar ao Carrinho'}
                        </Button>
                        <Button size="lg" variant="outline" onClick={handleShare}>
                            <Share2 className="mr-2 h-5 w-5" />
                            Compartilhar
                        </Button>
                    </div>

                </motion.div>
            </div>
        </motion.div>
    );
};

export default ProductDetailPage;