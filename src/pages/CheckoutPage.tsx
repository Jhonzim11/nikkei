import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, CreditCard, Barcode, QrCode } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { cn } from '../lib/utils';

const CheckoutPage: React.FC = () => {
    const { cartItems, totalPrice, clearCart } = useCart();
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('credit-card');

    const shippingCost = 5.00; // Custo de frete fixo como exemplo
    const finalTotal = totalPrice + shippingCost;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addToast('Pedido realizado com sucesso!', 'success');
        clearCart();
        navigate('/');
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <ShoppingCart className="mx-auto h-12 w-12 text-primary-500" />
                <h1 className="mt-4 text-2xl font-bold">Seu carrinho está vazio</h1>
                <p className="mt-2 text-gray-500">Adicione produtos na loja para continuar.</p>
                <Button asChild className="mt-6">
                    <NavLink to="/loja">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para a Loja
                    </NavLink>
                </Button>
            </div>
        );
    }
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
            <header className="text-center mb-12">
                <h1 className="text-3xl font-display font-bold text-primary-500">Finalizar Compra</h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Quase lá! Preencha seus dados para concluir o pedido.</p>
            </header>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Coluna de Informações */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informações de Entrega e Contato</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField id="name" label="Nome Completo" required />
                                <InputField id="email" label="Email" type="email" required />
                                <InputField id="cpf" label="CPF" placeholder="000.000.000-00" required />
                                <InputField id="phone" label="Celular" type="tel" placeholder="(00) 90000-0000" required />
                                <InputField id="address" label="Endereço" required className="md:col-span-2" />
                                <InputField id="number" label="Número" required />
                                <InputField id="complement" label="Complemento" />
                                <InputField id="neighborhood" label="Bairro" required />
                                <InputField id="city" label="Cidade" required />
                                <InputField id="state" label="Estado" required />
                                <InputField id="zip" label="CEP" placeholder="00000-000" required />
                            </CardContent>
                        </Card>
                        
                        <Card className="mt-8">
                            <CardHeader>
                                <CardTitle>Forma de Pagamento</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col md:flex-row gap-4">
                                <PaymentMethodOption 
                                    value="credit-card"
                                    icon={CreditCard}
                                    label="Cartão de Crédito"
                                    currentValue={paymentMethod}
                                    onChange={setPaymentMethod}
                                />
                                <PaymentMethodOption 
                                    value="pix"
                                    icon={QrCode}
                                    label="PIX"
                                    currentValue={paymentMethod}
                                    onChange={setPaymentMethod}
                                />
                                <PaymentMethodOption 
                                    value="boleto"
                                    icon={Barcode}
                                    label="Boleto Bancário"
                                    currentValue={paymentMethod}
                                    onChange={setPaymentMethod}
                                />
                            </CardContent>
                        </Card>

                    </div>

                    {/* Coluna do Resumo */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle>Resumo do Pedido</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex justify-between items-center text-sm">
                                            <div className="flex items-center gap-3">
                                                <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                                                <div>
                                                    <p className="font-semibold">{item.name}</p>
                                                    <p className="text-gray-500">Qtd: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="font-medium">R$ {( (item.promotionalPrice ?? item.price) * item.quantity ).toFixed(2).replace('.', ',')}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t my-4"></div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <p>Subtotal</p>
                                        <p>R$ {totalPrice.toFixed(2).replace('.', ',')}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Frete</p>
                                        <p>R$ {shippingCost.toFixed(2).replace('.', ',')}</p>
                                    </div>
                                    <div className="flex justify-between font-bold text-base mt-2">
                                        <p>Total</p>
                                        <p>R$ {finalTotal.toFixed(2).replace('.', ',')}</p>
                                    </div>
                                </div>
                                <Button type="submit" size="lg" className="w-full mt-6">Finalizar Compra</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </motion.div>
    );
};

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string, id: string }> = ({ label, id, className, ...props }) => (
    <div className={cn("flex flex-col", className)}>
        <label htmlFor={id} className="mb-1 text-sm font-medium">{label}{props.required && <span className="text-red-500 ml-1">*</span>}</label>
        <input 
            id={id}
            className="w-full p-2 border border-light-border dark:border-dark-border rounded-md bg-light-background dark:bg-dark-card focus:ring-2 focus:ring-primary-500 outline-none"
            {...props}
        />
    </div>
);

const PaymentMethodOption: React.FC<{
    value: string, 
    icon: React.ElementType, 
    label: string, 
    currentValue: string, 
    onChange: (value: string) => void 
}> = ({ value, icon: Icon, label, currentValue, onChange }) => (
    <div 
        className={cn(
            "flex-1 p-4 border rounded-lg flex items-center gap-3 cursor-pointer transition-all",
            currentValue === value 
                ? "border-primary-500 bg-primary-50 dark:bg-primary-500/10 ring-2 ring-primary-500" 
                : "border-light-border dark:border-dark-border hover:border-gray-400 dark:hover:border-gray-500"
        )}
        onClick={() => onChange(value)}
    >
        <Icon className="h-6 w-6 text-primary-500" />
        <span className="font-semibold">{label}</span>
    </div>
);

export default CheckoutPage;
