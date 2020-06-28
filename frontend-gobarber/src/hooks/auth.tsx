import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
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
      api.defaults.headers.Authorization = `Bearer ${token}`;

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

    api.defaults.headers.Authorization = `Bearer ${token}`;

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

  const updateUser = useCallback(
    (user: User) => {
      setData({
        token: data.token,
        user,
      });

      localStorage.setItem(
        `${process.env.REACT_APP_LOCALSTORAGE_PREFIX}:user`,
        JSON.stringify(user),
      );
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
