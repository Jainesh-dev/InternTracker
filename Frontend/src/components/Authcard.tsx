import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SocialLoginButton } from './SocialLoginButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AuthCardProps {
  onSuccess: (
    isNewUser: boolean
  ) => void;
}

export const AuthCard: React.FC<AuthCardProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
  onSuccess(!isLogin);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <h2 className="text-3xl font-bold text-white mb-2 text-center tracking-tight">
        {isLogin ? 'Welcome Back' : 'Get Started'}
      </h2>
      <p className="text-gray-400 text-sm text-center mb-6">
        {isLogin ? 'Enter your details to monitor your commands.' : 'Create your secure developer profile.'}
      </p>

      <div className="space-y-3 mb-6">
      <SocialLoginButton
          provider="Google"
          onClick={() => onSuccess(false)}
        />

        <SocialLoginButton
          provider="Apple"
          onClick={() => onSuccess(false)}
        />

        <SocialLoginButton
          provider="Microsoft"
          onClick={() => onSuccess(false)}
        />
      </div>

      <div className="relative my-6 flex py-1 items-center">
        <div className="flex-grow border-t border-white/10"></div>
        <span className="flex-shrink mx-4 text-xs uppercase text-gray-500 tracking-widest">or</span>
        <div className="flex-grow border-t border-white/10"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-gray-300">Email Address</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 bg-white/5 border-white/10 text-white rounded-xl placeholder:text-gray-600 focus:border-purple-500 transition-colors"
            placeholder="name@domain.com"
          />
        </div>
        <div>
          <Label htmlFor="password" className="text-gray-300">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 bg-white/5 border-white/10 text-white rounded-xl focus:border-purple-500 transition-colors"
          />
        </div>

        <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium shadow-lg shadow-purple-900/20 hover:opacity-90 transition-opacity mt-2">
          {isLogin ? 'Log In' : 'Create Account'}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
        </span>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-purple-400 hover:underline font-medium focus:outline-none"
        >
          {isLogin ? 'Sign Up' : 'Log In'}
        </button>
      </div>

      <p className="text-[11px] text-gray-600 text-center mt-6 leading-relaxed">
        By continuing you agree to our <br />
        <a href="#" className="underline hover:text-gray-400 transition-colors">Terms of Service</a> & <a href="#" className="underline hover:text-gray-400 transition-colors">Privacy Policy</a>.
      </p>
    </div>
  );
};