
import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { useToast } from '../contexts/ToastContext';
import { Store, PlusCircle, Trash2, Edit, Search, Shield, LogOut, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useProducts } from '../contexts/ProductContext';


const ADMIN_TOKEN = 'NIKKEI_ADMIN_2024!'; 

const ProductForm: React.FC<{
    product: Partial<Product> | null, 
    onSave: (product: Partial<Product>) => void, 
    onCancel: () => void,
    categories: string[]
}> = ({ product, onSave, onCancel, categories }) => {
    const [formData, setFormData] = useState<Partial<Product>>(product || { name: '', category: categories[0] || '', price: 0, imageUrl: '', rating: 0, reviewCount: 0, tags: [], description: '' });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: (name === 'price' || name === 'promotionalPrice') ? parseFloat(value) || 0 : value });
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const currentTags = formData.tags || [];
        let newTags: Product['tags'];
        if (checked) {
            newTags = [...currentTags, value as Product['tags'][0]];
        } else {
            newTags = currentTags.filter(tag => tag !== value);
        }
        
        const updatedFormData = { ...formData, tags: newTags };
        if (value === 'Promoção' && !checked) {
            updatedFormData.promotionalPrice = undefined;
        }
        setFormData(updatedFormData);
    };
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, imageUrl: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    }
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-light-text">
            <div><label className="font-medium">Nome do Produto</label><input name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded bg-transparent mt-1 text-light-text placeholder:text-gray-400"/></div>
             <div>
                <label className="font-medium">Descrição (Bio)</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full p-2 border rounded bg-transparent mt-1 text-light-text placeholder:text-gray-400"
                    placeholder="Descreva o produto, seus benefícios, materiais, etc."
                />
            </div>
            <div>
              <label className="font-medium">Categoria</label>
              <select name="category" value={formData.category} onChange={handleChange} required className="w-full p-2 border rounded bg-transparent mt-1 text-light-text">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div><label className="font-medium">Preço</label><input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required className="w-full p-2 border rounded bg-transparent mt-1 text-light-text placeholder:text-gray-400"/></div>
            
            {formData.tags?.includes('Promoção') && (
                 <div>
                    <label className="font-medium">Preço Promocional</label>
                    <input name="promotionalPrice" type="number" step="0.01" value={formData.promotionalPrice || ''} onChange={handleChange} placeholder="Ex: 99.90" required className="w-full p-2 border rounded bg-transparent mt-1 text-light-text placeholder:text-gray-400"/>
                </div>
            )}

            <div>
                <label className="font-medium">Imagem do Produto</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"/>
                {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="mt-2 h-24 w-24 object-cover rounded-md border p-1" />}
            </div>
             <div>
                <label className="font-medium">Tags</label>
                <div className="flex space-x-4 mt-2">
                    {(['Novo', 'Promoção', 'Esgotado'] as const).map(tag => (
                        <label key={tag} className="flex items-center space-x-2">
                            <input type="checkbox" value={tag} checked={formData.tags?.includes(tag)} onChange={handleTagChange} className="rounded text-primary-500 focus:ring-primary-500"/>
                            <span>{tag}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </div>
        </form>
    );
}

const getTagClass = (tag: string) => {
    switch (tag) {
      case 'Novo': return 'bg-blue-500';
      case 'Promoção': return 'bg-red-500';
      case 'Esgotado': return 'bg-gray-500';
      default: return 'bg-primary-500';
    }
};


const AdminPage: React.FC = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tokenInput, setTokenInput] = useState('');
    const [authError, setAuthError] = useState('');
    
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const [isProductModalOpen, setProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
    const { addToast } = useToast();

    useEffect(() => {
        const root = document.documentElement;
        const isDark = root.classList.contains('dark');
        if (isDark) {
          root.classList.remove('dark');
        }
        return () => {
          if (isDark) {
            root.classList.add('dark');
          }
        };
      }, []);

    useEffect(() => {
        const sessionToken = sessionStorage.getItem('admin_token');
        if (sessionToken === ADMIN_TOKEN) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (tokenInput === ADMIN_TOKEN) {
            sessionStorage.setItem('admin_token', tokenInput);
            setIsAuthenticated(true);
            setAuthError('');
        } else {
            setAuthError('Token inválido. Tente novamente.');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('admin_token');
        setIsAuthenticated(false);
        navigate('/');
    };

    const categories = useMemo(() => [...Array.from(new Set(products.map(p => p.category)))], [products]);

    const openProductModal = (product: Product | null) => {
        setEditingProduct(product);
        setProductModalOpen(true);
    };

    const handleProductSave = (productData: Partial<Product>) => {
        const productToSave = { ...productData };

        if (productToSave.tags?.includes('Promoção')) {
            if (!productToSave.promotionalPrice || productToSave.promotionalPrice <= 0 || !productToSave.price || productToSave.promotionalPrice >= productToSave.price) {
                addToast('Preço promocional deve ser válido e menor que o preço original.', 'error');
                return;
            }
        } else {
            productToSave.promotionalPrice = undefined;
        }

        if (editingProduct && productToSave.id) { 
            updateProduct(productToSave as Product);
            addToast('Produto atualizado!', 'success');
        } else {
            addProduct(productToSave as Omit<Product, 'id'>);
            addToast('Produto adicionado!', 'success');
        }
        setProductModalOpen(false);
        setEditingProduct(null);
    };

    const handleDeleteProduct = (productId: number) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            deleteProduct(productId);
            addToast('Produto excluído!', 'info');
        }
    };
    
    if (!isAuthenticated) {
        return (
            <div className="bg-light-background text-light-text min-h-screen flex items-center justify-center p-4">
                 <Card className="w-full max-w-sm text-center">
                     <CardHeader>
                         <Shield className="mx-auto h-12 w-12 text-primary-500" />
                         <CardTitle className="mt-4">Acesso ao Painel</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <p className="text-gray-500">Insira o token de acesso para continuar.</p>
                            <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input 
                                    type="password"
                                    value={tokenInput}
                                    onChange={(e) => setTokenInput(e.target.value)}
                                    placeholder="Seu token secreto"
                                    className="w-full p-2 pl-10 border rounded bg-transparent text-light-text placeholder:text-gray-400"
                                />
                            </div>
                            {authError && <p className="text-sm text-red-500">{authError}</p>}
                            <Button type="submit" className="w-full">Entrar</Button>
                        </form>
                     </CardContent>
                 </Card>
            </div>
        );
    }

    return (
        <div className="bg-light-background text-light-text min-h-screen p-4 sm:p-6 lg:p-8">
            <header className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <Store className="h-8 w-8 text-primary-500" />
                    <h1 className="text-3xl font-display font-bold">Gerenciador da Loja</h1>
                </div>
                <Button variant="ghost" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Sair do Painel
                </Button>
            </header>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                    <CardHeader>
                        <CardTitle>Produtos</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                            <div className="relative w-full md:max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/><input placeholder="Buscar produto..." className="pl-10 w-full p-2 border rounded bg-transparent text-light-text placeholder:text-gray-400"/></div>
                            <Button onClick={() => openProductModal(null)} className="w-full md:w-auto"><PlusCircle className="mr-2 h-4 w-4"/> Novo Produto</Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-black">
                                <thead className="border-b border-light-border">
                                    <tr>
                                        <th className="p-2">Produto</th>
                                        <th className="p-2 hidden sm:table-cell">Categoria</th>
                                        <th className="p-2">Preço</th>
                                        <th className="p-2 hidden md:table-cell">Tags</th>
                                        <th className="p-2 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p.id} className="border-b border-light-border hover:bg-gray-100">
                                            <td className="p-2 font-medium">{p.name}</td>
                                            <td className="p-2 hidden sm:table-cell">{p.category}</td>
                                            <td className="p-2 font-mono">
                                                {p.promotionalPrice && p.tags.includes('Promoção') ? (
                                                    <div className="flex flex-col">
                                                        <span className="text-red-500 font-bold">R$ {p.promotionalPrice.toFixed(2).replace('.', ',')}</span>
                                                        <s className="text-gray-500 text-xs">R$ {p.price.toFixed(2).replace('.', ',')}</s>
                                                    </div>
                                                ) : (
                                                    `R$ ${p.price.toFixed(2).replace('.', ',')}`
                                                )}
                                            </td>
                                            <td className="p-2 hidden md:table-cell">
                                                <div className="flex gap-1">
                                                    {p.tags.map(tag => (
                                                        <span key={tag} className={cn("text-white text-xs font-semibold px-2 py-0.5 rounded-full", getTagClass(tag))}>
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="p-2 flex space-x-1 justify-end">
                                                <Button size="icon" variant="ghost" onClick={() => openProductModal(p)}><Edit size={16}/></Button>
                                                <Button size="icon" variant="ghost" onClick={() => handleDeleteProduct(p.id)}><Trash2 size={16} className="text-red-500"/></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <Modal isOpen={isProductModalOpen} onClose={() => setProductModalOpen(false)} title={editingProduct ? 'Editar Produto' : 'Novo Produto'}>
              <ProductForm product={editingProduct} onSave={handleProductSave} onCancel={() => {setProductModalOpen(false); setEditingProduct(null);}} categories={categories} />
            </Modal>
        </div>
    );
}

export default AdminPage;
