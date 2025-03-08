'use client';

import * as React from 'react';
import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner';

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000;

type ToastProps = React.ComponentPropsWithoutRef<typeof SonnerToaster>;

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

type ActionType = typeof actionTypes;

interface ToastState {
  toasts: Toast[];
}

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

interface Toast {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive';
}

type Action =
  | {
      type: ActionType['ADD_TOAST'];
      toast: Toast;
    }
  | {
      type: ActionType['UPDATE_TOAST'];
      toast: Partial<Toast>;
    }
  | {
      type: ActionType['DISMISS_TOAST'];
      toastId?: string;
    }
  | {
      type: ActionType['REMOVE_TOAST'];
      toastId?: string;
    };

interface State {
  toasts: Toast[];
}

const toastReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map(t => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      if (toastId) {
        return {
          ...state,
          toasts: state.toasts.filter(t => t.id !== toastId),
        };
      }

      return {
        ...state,
        toasts: [],
      };
    }
    case 'REMOVE_TOAST': {
      const { toastId } = action;

      if (toastId) {
        return {
          ...state,
          toasts: state.toasts.filter(t => t.id !== toastId),
        };
      }

      return {
        ...state,
        toasts: [],
      };
    }
    default:
      return state;
  }
};

const ToastContext = React.createContext<{
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  updateToast: (toast: Partial<Toast> & { id: string }) => void;
  dismissToast: (toastId: string) => void;
  removeToast: (toastId: string) => void;
}>({
  toasts: [],
  addToast: () => '',
  updateToast: () => {},
  dismissToast: () => {},
  removeToast: () => {},
});

export function useToast() {
  const { addToast, dismissToast, removeToast, updateToast, toasts } =
    React.useContext(ToastContext);

  return {
    toast: (props: Omit<Toast, 'id'>) => {
      const title = props.title;
      const description = props.description;
      const variant = props.variant || 'default';

      if (variant === 'destructive') {
        sonnerToast.error(title as string, {
          description: description as string,
        });
      } else {
        sonnerToast(title as string, {
          description: description as string,
        });
      }

      return addToast(props);
    },
    dismiss: dismissToast,
    update: updateToast,
    toasts,
  };
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(toastReducer, { toasts: [] });

  const addToast = React.useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = genId();

      dispatch({
        type: 'ADD_TOAST',
        toast: {
          ...toast,
          id,
        },
      });

      return id;
    },
    [dispatch]
  );

  const updateToast = React.useCallback(
    (toast: Partial<Toast> & { id: string }) => {
      dispatch({
        type: 'UPDATE_TOAST',
        toast,
      });
    },
    [dispatch]
  );

  const dismissToast = React.useCallback(
    (toastId: string) => {
      dispatch({
        type: 'DISMISS_TOAST',
        toastId,
      });
    },
    [dispatch]
  );

  const removeToast = React.useCallback(
    (toastId: string) => {
      dispatch({
        type: 'REMOVE_TOAST',
        toastId,
      });
    },
    [dispatch]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts: state.toasts,
        addToast,
        updateToast,
        dismissToast,
        removeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function Toaster({ position = 'bottom-right', ...props }: ToastProps) {
  return (
    <SonnerToaster
      position={position}
      toastOptions={{
        style: {
          background: 'var(--background)',
          color: 'var(--foreground)',
          border: '1px solid var(--border)',
        },
      }}
      closeButton
      richColors
      {...props}
    />
  );
}
