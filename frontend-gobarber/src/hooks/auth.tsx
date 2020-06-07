import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface AuthState {
  token: string;
  user: any;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: any;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem(
      `${process.env.REACT_APP_LOCALSTORAGE_PREFIX}:token`,
    );

    const user = localStorage.getItem(
      `${process.env.REACT_APP_LOCALSTORAGE_PREFIX}:user`,
    );

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const { data: response } = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response;

    localStorage.setItem(
      `${process.env.REACT_APP_LOCALSTORAGE_PREFIX}:token`,
      token,
    );

    localStorage.setItem(
      `${process.env.REACT_APP_LOCALSTORAGE_PREFIX}:user`,
      JSON.stringify(user),
    );

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(
      `${process.env.REACT_APP_LOCALSTORAGE_PREFIX}:token`,
    );

    localStorage.removeItem(
      `${process.env.REACT_APP_LOCALSTORAGE_PREFIX}:user`,
    );

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
