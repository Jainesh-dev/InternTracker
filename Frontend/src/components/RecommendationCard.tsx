import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Building, Sparkles } from 'lucide-react';

export interface RecommendedInternship {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  matchScore: number;
}

interface RecommendationCardProps {
  internship: RecommendedInternship;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ internship }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md relative overflow-hidden flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-500/20 to-transparent px-3 py-1 rounded-bl-xl border-l border-b border-white/10 flex items-center gap-1">
        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
        <span className="text-xs font-semibold text-purple-300">{internship.matchScore}% Match</span>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Building className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-400">{internship.company}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{internship.title}</h3>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span>{internship.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Briefcase className="w-4 h-4 text-gray-500" />
          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300">
            {internship.type}
          </span>
        </div>
      </div>
    </motion.div>
  );
};