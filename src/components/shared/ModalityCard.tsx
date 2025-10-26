import React from 'react';
import { motion } from 'framer-motion';
import { Modality } from '../../types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Phone } from 'lucide-react';

interface ModalityCardProps {
  modality: Modality;
}

const ModalityCard: React.FC<ModalityCardProps> = ({ modality }) => {
  return (
    <motion.div whileHover={{ y: -5 }} className="h-full">
      <Card className="h-full flex flex-col overflow-hidden group">
        <CardHeader className="p-0 border-b border-light-border dark:border-dark-border">
          <div className="aspect-video overflow-hidden">
            <img 
              src={modality.imageUrl} 
              alt={modality.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col">
          <CardTitle className="text-lg font-bold">{modality.name}</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-4 flex-grow">{modality.description}</p>
          <div className="space-y-2 text-sm border-t border-light-border dark:border-dark-border pt-3">
            {modality.pricing.map((p) => (
              <div key={p.plan} className="flex justify-between items-center">
                <span>{p.plan}</span>
                <span className="font-bold text-primary-500">R$ {p.price.toFixed(2).replace('.', ',')}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button size="sm" asChild className="w-full">
            <a href="https://wa.me/5511999998888" target="_blank" rel="noopener noreferrer">
              <Phone size={16} className="mr-2" /> Agendar Aula
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ModalityCard;
