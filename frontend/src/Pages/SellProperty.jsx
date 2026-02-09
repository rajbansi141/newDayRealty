import React from 'react';
import { motion } from 'framer-motion';
import SellPropertyCard from '../Components/SellPropertyCard';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SellProperty() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-slate-600 hover:text-indigo-600 font-bold transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 hover:border-indigo-200"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
        </div>

        <SellPropertyCard />
      </div>
    </div>
  );
}
