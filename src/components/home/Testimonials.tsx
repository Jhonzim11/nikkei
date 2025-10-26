
import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../../data/db';
import { Card, CardContent } from '../ui/Card';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-display font-bold text-center text-primary-500 mb-12">O que nossos membros dizem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full flex flex-col p-6">
                <CardContent className="flex-grow p-0">
                  <Quote className="w-8 h-8 text-primary-500/50 mb-4" />
                  <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.comment}"</p>
                </CardContent>
                <div className="mt-6 flex items-center">
                  <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="ml-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <div className="flex text-yellow-500 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < testimonial.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
