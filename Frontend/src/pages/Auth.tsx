import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthCard } from '@/components/Authcard';
import { useAuth } from '@/services/authcontext';
import { ShieldCheck, Zap, Terminal } from 'lucide-react';

export const Auth: React.FC = () => {
  const { login ,signup } = useAuth();
  const navigate = useNavigate();

  const handleAuthSuccess = (
  isNewUser: boolean
) => {
  if (isNewUser) {
    signup();
    navigate("/onboarding");
  } else {
    login();
    navigate("/home");
  }
};

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white flex flex-col md:flex-row items-center justify-center p-6 md:p-0 overflow-hidden relative">
      {/* Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Left Canvas Panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 lg:px-32 mb-12 md:mb-0 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              InternTracker
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-none">
            Track • Apply <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Get Hired.
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg max-w-md font-medium">
            Your Personal Internship Command Center. Aggregate applications, extract optimization metrics, and dominate your hiring cycle.
          </p>
        </motion.div>

        {/* Floating Cards Canvas Mock */}
        <div className="mt-12 space-y-4 max-w-sm hidden lg:block relative">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 0.8, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-md flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400"><Zap className="w-4 h-4" /></div>
              <div>
                <p className="text-xs font-bold">SWE Intern @ Stripe</p>
                <p className="text-[10px] text-gray-500">Interview Scheduled</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">Tomorrow</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-md flex items-center justify-between opacity-60 translate-x-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400"><ShieldCheck className="w-4 h-4" /></div>
              <div>
                <p className="text-xs font-bold">AI Research Intern</p>
                <p className="text-[10px] text-gray-500">Offer Received</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">$8,500/mo</span>
          </motion.div>
        </div>
      </div>

      {/* Right Interactive Form Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <AuthCard onSuccess={handleAuthSuccess} />
        </motion.div>
      </div>
    </div>
  );
};