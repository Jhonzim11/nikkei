
import React from 'react';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { NavLink } from 'react-router-dom';

interface PlaceholderPageProps {
    title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center justify-center min-h-[60vh]"
    >
        <Wrench className="h-16 w-16 text-primary-500 mb-4" />
        <h1 className="text-3xl font-display font-bold">{title}</h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Esta página está em construção. Volte em breve para novidades!
        </p>
        <Button asChild className="mt-8">
            <NavLink to="/">
                Voltar para a Home
            </NavLink>
        </Button>
    </motion.div>
  );
};

export default PlaceholderPage;
