import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { teachers, modalities } from '../data/db';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Award, BookOpen, ChevronLeft, Phone } from 'lucide-react';

const TeacherProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const teacher = teachers.find(t => t.slug === slug);

  if (!teacher) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Professor não encontrado.</h1>
        <Button asChild className="mt-4">
          <NavLink to="/professores">
            <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para Professores
          </NavLink>
        </Button>
      </div>
    );
  }

  const taughtModalities = modalities.filter(modality => 
    teacher.specialty.includes(modality.name)
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
        <div className="mb-8">
            <Button asChild variant="ghost">
                <NavLink to="/professores">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para Professores
                </NavLink>
            </Button>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
            className="md:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
        >
          <Card className="text-center p-6">
            <img src={teacher.avatarUrl} alt={teacher.name} className="w-40 h-40 rounded-full mx-auto object-cover shadow-lg border-4 border-primary-500" />
            <h1 className="text-2xl font-display font-bold mt-4">{teacher.name}</h1>
            <p className="text-primary-500 font-semibold mt-1">{teacher.specialty}</p>
             <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 mt-4">
                <Award size={18} className="mr-2" />
                <span>{teacher.experience} anos de experiência</span>
             </div>
             <Button className="mt-6 w-full" asChild>
                <a href={`https://wa.me/${teacher.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    <Phone size={16} className="mr-2" /> Agendar Aula
                </a>
             </Button>
          </Card>
        </motion.div>
        
        <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Sobre {teacher.name.split(' ')[0]}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed">{teacher.bio}</p>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-3 text-primary-500" />
                Modalidades Lecionadas
              </CardTitle>
            </CardHeader>
            <CardContent>
                {taughtModalities.length > 0 ? (
                    <ul className="space-y-3">
                        {taughtModalities.map(modality => (
                            <li key={modality.id} className="p-3 rounded-lg bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border">
                                <h4 className="font-semibold">{modality.name}</h4>
                                <div className="mt-2 space-y-1 text-sm">
                                    {modality.pricing.map(p => (
                                        <div key={p.plan} className="flex justify-between">
                                            <span>{p.plan}</span>
                                            <span className="font-medium">R$ {p.price.toFixed(2).replace('.',',')}</span>
                                        </div>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhuma modalidade encontrada para este professor.</p>
                )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TeacherProfilePage;
