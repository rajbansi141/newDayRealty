import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Users, Home, Award } from 'lucide-react';

const StatCounter = ({ value, label, icon: Icon, color, suffix = '+' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      const duration = 2000;
      const incrementTime = duration / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${color}`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-4xl font-black text-slate-900 mb-2">
        {count}{suffix}
      </h3>
      <p className="text-slate-500 font-bold uppercase tracking-wider text-sm">{label}</p>
    </div>
  );
};

export default function StatsSection() {
  const stats = [
    { label: 'Years of Excellence', value: '12', icon: Trophy, color: 'bg-amber-500 shadow-amber-200' },
    { label: 'Happy Families', value: '850', icon: Users, color: 'bg-blue-500 shadow-blue-200' },
    { label: 'Premium Listings', value: '120', icon: Home, color: 'bg-emerald-500 shadow-emerald-200' },
    { label: 'Awards New', value: '15', icon: Award, color: 'bg-indigo-500 shadow-indigo-200' },
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-20 right-10 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-600 font-black uppercase tracking-widest text-sm"
          >
            Our Impact
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mt-2 mb-4"
          >
            Building Trust Since 2012
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            We take pride in our track record of connecting thousands of families with their perfect homes and investment opportunities.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCounter key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
