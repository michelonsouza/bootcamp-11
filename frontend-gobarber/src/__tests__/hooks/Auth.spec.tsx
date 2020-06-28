import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { useAuth, AuthProvider } from '../../hooks/auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

const authDataMock = {
  token: 'fake-token',
  user: {
    id: 'fake-id',
    name: 'John Doe',
    email: 'johndoe@example.com',
    avatar: 'fake-avatar.png',
    created_at: new Date(),
    updated_at: new Date(),
    avatar_url: 'https://fakedomain.com/fake-avatar.png',
  },
};

describe('Auth hook', () => {
  it('should be able to signin', async () => {
    apiMock.onPost('sessions').reply(200, authDataMock);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'johndoe@example.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      `${process.env.REACT_APP_LOCALSTORAGE_PREFIX}:token`,
      authDataMock.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      `${process.env.REACT_APP_LOCALSTORAGE_PREFIX}:user`,
      JSON.stringify(authDataMock.user),
    );
    expect(result.current.user.email).toEqual('johndoe@example.com');
  });

  it('should restore saved data from storage when auth inits', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      const storage = {
        [`${process.env.REACT_APP_LOCALSTORAGE_PREFIX}:token`]: authDataMock.token,
        [`${process.env.REACT_APP_LOCALSTORAGE_PREFIX}:user`]: JSON.stringify(
          authDataMock.user,
        ),
      };

      return storage[key];
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('johndoe@example.com');
  });

  it('should be able to signout', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      const storage = {
        [`${process.env.REACT_APP_LOCALSTORAGE_PREFIX}:token`]: authDataMock.token,
        [`${process.env.REACT_APP_LOCALSTORAGE_PREFIX}:user`]: JSON.stringify(
          authDataMock.user,
        ),
      };

      return storage[key];
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      ...authDataMock.user,
      name: 'Michelon Souza',
      email: 'michelon@example.com',
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      `${process.env.REACT_APP_LOCALSTORAGE_PREFIX}:user`,
      JSON.stringify(user),
    );

    expect(result.current.user).toEqual(user);
  });
});
