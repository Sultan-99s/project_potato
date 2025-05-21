import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, ...toast }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
};

export const Toaster: React.FC = () => {
  const context = useContext(ToastContext);
  
  if (!context) return null;
  
  const { toasts, removeToast } = context;

  return (
    <div className="fixed bottom-0 right-0 p-4 space-y-4 z-50 max-w-md w-full">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{
  toast: Toast;
  onClose: () => void;
}> = ({ toast, onClose }) => {
  const { title, description, variant = 'info', duration = 5000 } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const variantClasses = {
    success: 'bg-green-50 border-green-400 text-green-800',
    error: 'bg-red-50 border-red-400 text-red-800',
    warning: 'bg-amber-50 border-amber-400 text-amber-800',
    info: 'bg-blue-50 border-blue-400 text-blue-800',
  };

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertCircle className="h-5 w-5 text-amber-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };

  return (
    <div
      className={`rounded-lg border shadow-md p-4 flex items-start space-x-3 transition-all duration-300 ease-in-out animate-slide-up ${
        variantClasses[variant]
      }`}
    >
      <div className="flex-shrink-0">{icons[variant]}</div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        {description && <p className="text-sm mt-1">{description}</p>}
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:bg-gray-200 p-1 rounded-full transition-colors duration-200"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export const toast = (props: Omit<Toast, 'id'>) => {
  // This function will be properly defined once the context is available
  // For now, we're creating a placeholder to be used for the direct import
  try {
    const context = useContext(ToastContext);
    if (context) {
      context.addToast(props);
    }
  } catch (error) {
    console.error('Toast context not available');
  }
};

export default ToastProvider;