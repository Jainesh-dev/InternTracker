import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/services/authcontext';
import { RecommendationCard, RecommendedInternship } from '@/components/RecommendationCard';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';


const MOCK_RECOMMENDATIONS: RecommendedInternship[] = [
  { id: 'rec-1', title: 'Software Engineering Intern', company: 'Linear', location: 'Remote', type: 'Remote', matchScore: 98 },
  { id: 'rec-2', title: 'Data Analytics Intern', company: 'Vercel', location: 'New York, NY', type: 'Hybrid', matchScore: 94 },
  { id: 'rec-3', title: 'AI/ML Intern', company: 'Scale AI', location: 'San Francisco, CA', type: 'Onsite', matchScore: 89 },
  { id: 'rec-4', title: 'Embedded Systems Intern', company: 'Tesla', location: 'Palo Alto, CA', type: 'Onsite', matchScore: 85 }
];

export const Recommendations: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white py-16 px-6 relative overflow-hidden flex flex-col justify-center items-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[30vw] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-5xl z-10 space-y-10">
        <div className="text-center space-y-3">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" /> Engine Complete
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Welcome, {user?.firstName || 'Developer'} 🎉
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-xl mx-auto"
          >
            We've compiled optimized application vectors matching your technical profile.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {MOCK_RECOMMENDATIONS.map((internship) => (
            <RecommendationCard key={internship.id} internship={internship} />
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Button 
            variant="outline" 
            onClick={() => navigate('/internships')}
            className="w-full sm:w-auto bg-white/5 border-white/10 text-white rounded-xl hover:bg-white/10"
          >
            Explore All Recommendations
          </Button>
          <Button 
            onClick={() => navigate('/home')}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 group"
          >
            Continue to Command Center
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};