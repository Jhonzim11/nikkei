
import React from 'react';
import { motion } from 'framer-motion';
import { modalities } from '../data/db';
import ModalityCard from '../components/shared/ModalityCard';

const ModalitiesPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <header className="text-center mb-12">
        <h1 className="text-3xl font-display font-bold text-primary-500">Modalidades e Preços</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Encontre a aula perfeita para você e comece a treinar conosco.</p>
      </header>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        {modalities.map(modality => (
          <motion.div key={modality.id} variants={itemVariants}>
            <ModalityCard modality={modality} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ModalitiesPage;
