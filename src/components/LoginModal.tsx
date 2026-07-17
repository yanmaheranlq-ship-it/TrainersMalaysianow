import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LogIn, ShieldCheck, Mail, Lock, Sparkles, CheckCircle2, Eye, EyeOff, Users } from 'lucide-react';
import { Trainer } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userName: string, role: 'admin' | 'trainer', trainerId?: string) => void;
  trainers: Trainer[];
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess, trainers = [] }: LoginModalProps) {
  const [loginType, setLoginType] = useState<'admin' | 'trainer'>('admin');
  const [email, setEmail] = useState('admin@trainerpreneur.world');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [successName, setSuccessName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      if (!email.includes('@')) {
        setError('Please enter a valid email address.');
        setIsSubmitting(false);
        return;
      }

      if (loginType === 'admin') {
        if (email.trim().toLowerCase() === 'admin@trainerpreneur.world' && password === 'password123') {
          setSuccessName('Administrator');
          setSuccess(true);
          setIsSubmitting(false);
          setTimeout(() => {
            onLoginSuccess('Administrator', 'admin');
            onClose();
            setSuccess(false);
          }, 1200);
        } else {
          setError('Invalid administrator email or password.');
          setIsSubmitting(false);
        }
      } else {
        // Look for the trainer by email
        const foundTrainer = trainers.find(
          (t) => t.email.trim().toLowerCase() === email.trim().toLowerCase()
        );

        if (foundTrainer) {
          // If trainer was preloaded, password is 'password123' if not specifically set
          const expectedPassword = foundTrainer.password || 'password123';
          if (password === expectedPassword) {
            setSuccessName(foundTrainer.name);
            setSuccess(true);
            setIsSubmitting(false);
            setTimeout(() => {
              onLoginSuccess(foundTrainer.name, 'trainer', foundTrainer.id);
              onClose();
              setSuccess(false);
            }, 1200);
          } else {
            setError('Incorrect password for Trainer account.');
            setIsSubmitting(false);
          }
        } else {
          setError('This email address is not registered as a Trainer.');
          setIsSubmitting(false);
        }
      }
    }, 1200);
  };

  const fillDemoCredentials = () => {
    if (loginType === 'admin') {
      setEmail('admin@trainerpreneur.world');
      setPassword('password123');
    } else {
      // Pick first trainer if available, or fallback
      const targetTrainer = trainers[0] || { email: 'fadhil.sho@industrial-safety.my' };
      setEmail(targetTrainer.email);
      setPassword('password123');
    }
  };

  const handleSwitchType = (type: 'admin' | 'trainer') => {
    setLoginType(type);
    setError('');
    if (type === 'admin') {
      setEmail('admin@trainerpreneur.world');
      setPassword('password123');
    } else {
      const targetTrainer = trainers[0];
      setEmail(targetTrainer ? targetTrainer.email : 'fadhil.sho@industrial-safety.my');
      setPassword('password123');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" id="login-modal-wrapper">
          {/* Backdrop blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/85 backdrop-blur-md"
            id="login-modal-backdrop"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative w-full max-w-md bg-zinc-900 border border-zinc-800/80 rounded-2xl shadow-2xl overflow-hidden z-10 p-6 md:p-8"
            id="login-modal-card"
          >
            {/* Upper Glow decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-24 bg-red-500/10 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent pointer-events-none" />

            {/* Header section */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800/60 relative">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl shadow-inner shrink-0">
                  {loginType === 'admin' ? (
                    <ShieldCheck size={20} className="animate-pulse" />
                  ) : (
                    <Users size={20} className="text-red-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-black text-white tracking-tight leading-tight">
                    {loginType === 'admin' ? 'Admin Access' : 'Trainer Portal'}
                  </h3>
                  <span className="text-[10px] font-black text-red-500 tracking-widest block mt-0.5 uppercase">
                    {loginType === 'admin' ? 'ADMIN LOGIN' : 'TRAINER LOGIN'}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-zinc-850 hover:bg-red-950 border border-zinc-800 hover:border-red-500/30 text-zinc-400 hover:text-red-400 transition-all cursor-pointer"
                aria-label="Close modal"
                id="login-close-btn"
              >
                <X size={15} />
              </button>
            </div>

            {/* Login Type Slider Toggle */}
            <div className="bg-zinc-950 p-1 rounded-xl border border-zinc-800/60 flex items-center mb-6 relative">
              <button
                type="button"
                onClick={() => handleSwitchType('admin')}
                className={`relative z-10 w-1/2 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  loginType === 'admin' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Admin (Administrator)
                {loginType === 'admin' && (
                  <motion.div
                    layoutId="activeLoginTab"
                    className="absolute inset-0 bg-red-600/15 border border-red-500/20 rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
              <button
                type="button"
                onClick={() => handleSwitchType('trainer')}
                className={`relative z-10 w-1/2 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  loginType === 'trainer' ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Trainer
                {loginType === 'trainer' && (
                  <motion.div
                    layoutId="activeLoginTab"
                    className="absolute inset-0 bg-red-600/15 border border-red-500/20 rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            </div>

            {/* Content area */}
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 flex flex-col items-center text-center space-y-4"
              >
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                  <CheckCircle2 size={40} className="animate-bounce" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-white">Login Successful!</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">
                    Welcome back, <strong className="text-white">{successName}</strong>. Opening portal for you...
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-950/40 border border-red-900/40 rounded-xl text-xs text-red-400 font-medium leading-relaxed"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Helper credentials box */}
                <div className="p-3 bg-zinc-950/60 border border-zinc-800/40 rounded-xl space-y-2.5 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-zinc-500 block uppercase tracking-wider">
                      {loginType === 'admin' ? 'Official Demo Account' : 'Trainer Account (Demo)'}
                    </span>
                    <span className="text-[9px] font-bold text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20 uppercase">
                      Pass: password123
                    </span>
                  </div>

                  {loginType === 'admin' ? (
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold text-zinc-350 block truncate">
                        admin@trainerpreneur.world
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setEmail('admin@trainerpreneur.world');
                          setPassword('password123');
                        }}
                        className="px-2.5 py-1 text-[10px] font-extrabold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-all cursor-pointer hover:scale-102 shrink-0"
                      >
                        Select Account
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                      {trainers.slice(0, 4).map((t) => (
                        <div key={t.id} className="flex items-center justify-between gap-2 p-1.5 bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-850 hover:border-red-500/30 rounded-lg transition-all text-xs">
                          <div className="overflow-hidden">
                            <span className="font-bold text-white block text-[11px] truncate">{t.name}</span>
                            <span className="text-[9px] text-zinc-400 block truncate">{t.email}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setEmail(t.email);
                              setPassword(t.password || 'password123');
                            }}
                            className="px-2 py-1 text-[9px] font-black uppercase tracking-wider bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/15 rounded-md transition-all cursor-pointer shrink-0"
                          >
                            Select
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Email Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300 block">
                    {loginType === 'admin' ? 'Admin Email' : 'Trainer Email'}{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={15} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={loginType === 'admin' ? 'Enter admin email' : 'Enter your registered email'}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-950/80 border border-zinc-800/80 rounded-xl text-white text-xs placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-300 block">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[10px] font-bold text-red-500 hover:text-red-400 transition-colors cursor-pointer uppercase tracking-wider">
                      Forgot password?
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={15} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full pl-10 pr-10 py-3 bg-zinc-950/80 border border-zinc-800/80 rounded-xl text-white text-xs placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all font-mono"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-widest rounded-xl border border-red-600 hover:border-red-500 shadow-[0_4px_12px_rgba(239,68,68,0.2)] hover:shadow-[0_4px_20px_rgba(239,68,68,0.35)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none mt-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying Access...
                    </span>
                  ) : (
                    <>
                      <LogIn size={14} className="stroke-[2.5]" />
                      <span>Login Now</span>
                    </>
                  )}
                </button>

                {/* Footer Disclaimer */}
                <div className="pt-4 border-t border-zinc-800/50 flex items-start gap-2.5 text-[10px] text-zinc-500 leading-normal">
                  <Sparkles size={12} className="text-red-400 shrink-0 mt-0.5" />
                  <span>
                    The Trainerpreneur.World security system is encrypted using industry-standard SSL (Secure Socket Layer) to guarantee data protection.
                  </span>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
