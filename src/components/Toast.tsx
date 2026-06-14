import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextType {
  show: (type: ToastType, message: string, title?: string, duration?: number) => void;
  success: (message: string, title?: string, duration?: number) => void;
  error: (message: string, title?: string, duration?: number) => void;
  info: (message: string, title?: string, duration?: number) => void;
  warning: (message: string, title?: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((type: ToastType, message: string, title?: string, duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = { id, type, message, title, duration };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  const success = useCallback((message: string, title?: string, duration?: number) => {
    show('success', message, title || 'Success', duration);
  }, [show]);

  const error = useCallback((message: string, title?: string, duration?: number) => {
    show('error', message, title || 'Error', duration);
  }, [show]);

  const info = useCallback((message: string, title?: string, duration?: number) => {
    show('info', message, title || 'Information', duration);
  }, [show]);

  const warning = useCallback((message: string, title?: string, duration?: number) => {
    show('warning', message, title || 'Warning', duration);
  }, [show]);

  return (
    <ToastContext.Provider value={{ show, success, error, info, warning }}>
      {children}
      
      {/* Toast Overlay Portal Container */}
      <div 
        id="toast-portal-container"
        className="fixed top-5 right-5 z-[9999] flex flex-col gap-3.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => {
            // Pick styles & colors to match GoDriveify's sleek premium black/red theme
            let iconColor = 'text-red-500';
            let borderColor = 'border-red-500/20';
            let bgColor = 'bg-slate-900/95';
            let IconComponent = Info;

            switch (toast.type) {
              case 'success':
                iconColor = 'text-emerald-500';
                borderColor = 'border-emerald-500/20';
                bgColor = 'bg-slate-900/95';
                IconComponent = CheckCircle2;
                break;
              case 'error':
                iconColor = 'text-red-500';
                borderColor = 'border-red-500/20';
                bgColor = 'bg-slate-900/95';
                IconComponent = AlertCircle;
                break;
              case 'warning':
                iconColor = 'text-amber-500';
                borderColor = 'border-amber-500/20';
                bgColor = 'bg-slate-900/95';
                IconComponent = AlertTriangle;
                break;
              case 'info':
              default:
                iconColor = 'text-blue-500';
                borderColor = 'border-blue-500/20';
                bgColor = 'bg-slate-900/95';
                IconComponent = Info;
                break;
            }

            return (
              <motion.div
                key={toast.id}
                layout
                id={`toast-${toast.id}`}
                initial={{ opacity: 0, y: -20, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.2 } }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`pointer-events-auto rounded-2xl border ${borderColor} ${bgColor} backdrop-blur-md p-4 shadow-[0_12px_40px_rgba(0,0,0,0.35)] flex items-start gap-3 relative overflow-hidden`}
              >
                {/* Accent mini glow */}
                <div className={`absolute top-0 left-0 w-1.5 h-full ${toast.type === 'success' ? 'bg-emerald-500' : toast.type === 'error' ? 'bg-red-500' : toast.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`} />

                {/* Toast Icon */}
                <div className="shrink-0 pt-0.5 pl-1.5">
                  <IconComponent className={`w-5 h-5 ${iconColor}`} />
                </div>

                {/* Toast Copy */}
                <div className="flex-1 space-y-1 pr-6 pl-1">
                  {toast.title && (
                    <h5 className="text-[12px] font-black uppercase tracking-wider text-white select-none">
                      {toast.title}
                    </h5>
                  )}
                  <p className="text-xs text-slate-300 font-medium leading-relaxed font-sans">
                    {toast.message}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  id={`close-toast-${toast.id}`}
                  onClick={() => removeToast(toast.id)}
                  className="absolute top-3.5 right-3.5 text-slate-500 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-lg shrink-0 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {/* Progress bar countdown track */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
                  <motion.div
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: (toast.duration || 4000) / 1000, ease: 'linear' }}
                    className={`h-full ${toast.type === 'success' ? 'bg-emerald-500' : toast.type === 'error' ? 'bg-red-500' : toast.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
