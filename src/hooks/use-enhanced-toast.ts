import {
  useToast as useOriginalToast,
  toast as originalToast,
} from '@/hooks/use-toast';

interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  [key: string]: unknown;
}

// Enhanced toast with success, error, warning methods
export const toast = {
  ...originalToast,
  success: ({ title, description, ...props }: ToastOptions) => {
    return originalToast({
      title,
      description,
      className: 'bg-green-500 text-white border-green-600',
      ...props,
    });
  },
  error: ({ title, description, ...props }: ToastOptions) => {
    return originalToast({
      title,
      description,
      variant: 'destructive',
      ...props,
    });
  },
  warning: ({ title, description, ...props }: ToastOptions) => {
    return originalToast({
      title,
      description,
      className: 'bg-yellow-500 text-white border-yellow-600',
      ...props,
    });
  },
};

export const useToast = () => {
  const originalHook = useOriginalToast();
  return {
    ...originalHook,
    toast,
  };
};
