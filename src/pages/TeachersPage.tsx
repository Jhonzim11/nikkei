
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { teachers } from '../data/db';
import { Teacher } from '../types';
import TeacherCard from '../components/shared/TeacherCard';

const TeachersPage: React.FC = () => {
  const [allTeachers] = useState<Teacher[]>(teachers);
  const [filters, setFilters] = useState({
    specialty: 'all',
    search: '',
  });

  const specialties = useMemo(() => {
    const uniqueSpecialties = Array.from(new Set(teachers.map(t => {
      if (t.specialty.includes('Tênis')) return 'Tênis';
      if (t.specialty.includes('Beach Tennis')) return 'Beach Tennis';
      return 'Outro';
    })));
    return ['all', ...uniqueSpecialties];
  }, []);

  const filteredTeachers = useMemo(() => {
    return allTeachers.filter(teacher => {
      const specialtyMatch = filters.specialty === 'all' || teacher.specialty.includes(filters.specialty);
      const searchMatch = teacher.name.toLowerCase().includes(filters.search.toLowerCase());
      return specialtyMatch && searchMatch;
    });
  }, [allTeachers, filters]);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({...prev, [name]: value}));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <header className="text-center mb-12">
        <h1 className="text-3xl font-display font-bold text-primary-500">Nossos Professores</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Conheça nossa equipe de especialistas prontos para elevar seu jogo.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input 
          type="text"
          name="search"
          placeholder="Buscar professor..."
          value={filters.search}
          onChange={handleFilterChange}
          className="w-full md:w-1/3 p-2 border border-light-border dark:border-dark-border rounded-md bg-light-card dark:bg-dark-card focus:ring-2 focus:ring-primary-500 outline-none"
        />
        <select
          name="specialty"
          value={filters.specialty}
          onChange={handleFilterChange}
          className="w-full md:w-1/4 p-2 border border-light-border dark:border-dark-border rounded-md bg-light-card dark:bg-dark-card focus:ring-2 focus:ring-primary-500 outline-none"
        >
          {specialties.map(spec => (
            <option key={spec} value={spec} className="capitalize">{spec === 'all' ? 'Todas as Modalidades' : spec}</option>
          ))}
        </select>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <AnimatePresence>
            {filteredTeachers.map(teacher => (
                <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default TeachersPage;
