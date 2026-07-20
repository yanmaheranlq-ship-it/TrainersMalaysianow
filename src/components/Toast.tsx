import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';
export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

let toastIdCounter = 0;
const listeners = new Set<(toasts: Toast[]) => void>();
let currentToasts: Toast[] = [];

function emit() {
  listeners.forEach((l) => l([...currentToasts]));
}

export function showToast(message: string, type: ToastType = 'success', duration = 4000) {
  const id = ++toastIdCounter;
  currentToasts = [...currentToasts, { id, message, type }];
  emit();
  if (duration > 0) {
    setTimeout(() => dismissToast(id), duration);
  }
  return id;
}

export function dismissToast(id: number) {
  currentToasts = currentToasts.filter((t) => t.id !== id);
  emit();
}

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>(currentToasts);
  useEffect(() => {
    const listener = (next: Toast[]) => setToasts(next);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);
  return toasts;
}

const ICONS = {
  success: CheckCircle,
  error: AlertTriangle,
  info: Info,
};

const STYLES = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-zinc-50 border-zinc-200 text-zinc-800',
};

const ICON_STYLES = {
  success: 'text-emerald-500',
  error: 'text-red-500',
  info: 'text-zinc-500',
};

export function ToastContainer() {
  const toasts = useToasts();
  const handleDismiss = useCallback((id: number) => dismissToast(id), []);

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-[calc(100%-2rem)] sm:w-auto pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className={`pointer-events-auto flex items-start gap-2.5 p-3.5 pr-3 rounded-xl border shadow-lg backdrop-blur-sm ${STYLES[toast.type]}`}
            >
              <Icon size={18} className={`shrink-0 mt-0.5 ${ICON_STYLES[toast.type]}`} />
              <p className="text-sm font-medium leading-snug flex-1">{toast.message}</p>
              <button
                onClick={() => handleDismiss(toast.id)}
                className="shrink-0 p-0.5 rounded-full hover:bg-black/5 transition-colors cursor-pointer opacity-60 hover:opacity-100"
                aria-label="Tutup"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
