
import React from 'react';
import { motion } from 'framer-motion';
import { Teacher } from '../../types';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Award, UserCheck } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface TeacherCardProps {
  teacher: Teacher;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring' }}
      className="h-full"
    >
      <Card className="h-full text-center flex flex-col items-center group overflow-hidden">
        <CardHeader className="p-0 relative w-full">
            <div className="aspect-square w-full overflow-hidden">
                 <img 
                    src={teacher.avatarUrl} 
                    alt={teacher.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <h3 className="text-xl font-bold font-display">{teacher.name}</h3>
          <p className="text-primary-500 font-semibold mt-1">{teacher.specialty}</p>
          <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 mt-4 space-x-4">
             <div className="flex items-center space-x-1.5">
                <Award size={18} />
                <span>{teacher.experience} anos</span>
             </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 w-full">
          <Button className="w-full" asChild>
            <NavLink to={`/professores/${teacher.slug}`}>
              <UserCheck className="mr-2 h-4 w-4" /> Ver Perfil
            </NavLink>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TeacherCard;
