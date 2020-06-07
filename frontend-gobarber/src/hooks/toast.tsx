import React, { useState, useCallback, useContext, createContext } from 'react';
import { uuid } from 'uuidv4';

import { ToastContainer } from '../components';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
}

interface ToastContextdata {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextdata>({} as ToastContextdata);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();
      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages(oldMessages => [...oldMessages, toast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages(oldMessages =>
      oldMessages.filter(message => message.id !== id),
    );
  }, []);

  return (
    <ToastContext.Provider
      value={{ addToast, removeToast } as ToastContextdata}
    >
      <ToastContainer messages={messages} timer={3000} progressBar />
      {children}
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextdata {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
