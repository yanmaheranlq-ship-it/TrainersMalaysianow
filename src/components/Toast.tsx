import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertTriangle, Info, X, Trash2 } from 'lucide-react';

// ─── Toast ────────────────────────────────────────────────────────────────────

export type ToastType = 'success' | 'error' | 'info';
export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

let toastIdCounter = 0;
const toastListeners = new Set<(toasts: Toast[]) => void>();
let currentToasts: Toast[] = [];

function emitToasts() {
  toastListeners.forEach((l) => l([...currentToasts]));
}

export function showToast(message: string, type: ToastType = 'success', duration = 4000) {
  const id = ++toastIdCounter;
  currentToasts = [...currentToasts, { id, message, type }];
  emitToasts();
  if (duration > 0) setTimeout(() => dismissToast(id), duration);
  return id;
}

export function dismissToast(id: number) {
  currentToasts = currentToasts.filter((t) => t.id !== id);
  emitToasts();
}

function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>(currentToasts);
  useEffect(() => {
    toastListeners.add(setToasts);
    return () => { toastListeners.delete(setToasts); };
  }, []);
  return toasts;
}

const TOAST_ICONS = { success: CheckCircle, error: AlertTriangle, info: Info };
const TOAST_STYLES = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error:   'bg-red-50   border-red-200   text-red-800',
  info:    'bg-zinc-50  border-zinc-200  text-zinc-800',
};
const TOAST_ICON_STYLES = {
  success: 'text-emerald-500',
  error:   'text-red-500',
  info:    'text-zinc-500',
};

export function ToastContainer() {
  const toasts = useToasts();
  const handleDismiss = useCallback((id: number) => dismissToast(id), []);
  return (
    <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 max-w-sm w-[calc(100%-2rem)] sm:w-auto pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = TOAST_ICONS[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className={`pointer-events-auto flex items-start gap-2.5 p-3.5 pr-3 rounded-xl border shadow-lg backdrop-blur-sm ${TOAST_STYLES[toast.type]}`}
            >
              <Icon size={18} className={`shrink-0 mt-0.5 ${TOAST_ICON_STYLES[toast.type]}`} />
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

// ─── Confirm Dialog ───────────────────────────────────────────────────────────

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
}

interface ConfirmState extends ConfirmOptions {
  id: number;
  resolve: (value: boolean) => void;
}

let confirmIdCounter = 0;
const confirmListeners = new Set<(state: ConfirmState | null) => void>();
let currentConfirm: ConfirmState | null = null;

function emitConfirm() {
  confirmListeners.forEach((l) => l(currentConfirm));
}

export function showConfirm(options: ConfirmOptions): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    currentConfirm = { ...options, id: ++confirmIdCounter, resolve };
    emitConfirm();
  });
}

function useConfirmState() {
  const [state, setState] = useState<ConfirmState | null>(null);
  useEffect(() => {
    confirmListeners.add(setState);
    return () => { confirmListeners.delete(setState); };
  }, []);
  return state;
}

const CONFIRM_VARIANT_STYLES = {
  danger:  { iconBg: 'bg-red-500/10',   iconRing: 'ring-red-500/20',   iconColor: 'text-red-400',    btn: 'bg-red-600 hover:bg-red-500 active:bg-red-700', btnShadow: 'shadow-red-900/40' },
  warning: { iconBg: 'bg-amber-500/10', iconRing: 'ring-amber-500/20', iconColor: 'text-amber-400',  btn: 'bg-amber-600 hover:bg-amber-500 active:bg-amber-700', btnShadow: 'shadow-amber-900/40' },
  info:    { iconBg: 'bg-blue-500/10',  iconRing: 'ring-blue-500/20',  iconColor: 'text-blue-400',   btn: 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700', btnShadow: 'shadow-blue-900/40' },
};

export function ConfirmDialogContainer() {
  const state = useConfirmState();

  const handleResponse = useCallback((value: boolean) => {
    if (!state) return;
    currentConfirm = null;
    emitConfirm();
    state.resolve(value);
  }, [state]);

  const variant = state?.variant ?? 'danger';
  const styles = CONFIRM_VARIANT_STYLES[variant];

  return (
    <AnimatePresence>
      {state && (
        <motion.div
          key={state.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) handleResponse(false); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-[360px] overflow-hidden"
          >
            {/* Body */}
            <div className="px-6 pt-6 pb-5 text-center flex flex-col items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ring-1 ${styles.iconBg} ${styles.iconRing}`}>
                <Trash2 size={24} className={styles.iconColor} strokeWidth={1.75} />
              </div>
              <div className="space-y-1.5">
                <p className="text-white font-bold text-[17px] leading-tight tracking-tight">
                  {state.title ?? 'Pengesahan'}
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {state.message}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 flex items-center gap-3">
              <button
                onClick={() => handleResponse(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-750 border border-zinc-700/80 hover:border-zinc-600 transition-all duration-150 cursor-pointer"
              >
                {state.cancelLabel ?? 'Batal'}
              </button>
              <button
                onClick={() => handleResponse(true)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-150 cursor-pointer shadow-lg ${styles.btn} ${styles.btnShadow}`}
              >
                {state.confirmLabel ?? 'Padam'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
