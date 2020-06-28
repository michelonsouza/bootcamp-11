import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';

import { render, act, fireEvent, wait } from '../../utils/testUtils';
import api from '../../services/api';
import AppProvider from '../../hooks';

import { Dashboard } from '../../pages';

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
    avatar_url: null,
  },
};

const appointmentDataMOck = [
  {
    id: 'appointment-fake-id-1',
    date: '2020-06-27 08:00:00',
    user: authDataMock.user,
  },
  {
    id: 'appointment-fake-id',
    date: '2020-06-27 12:00:00',
    user: authDataMock.user,
  },
];

const monthAvailableDataMock = [
  { day: '01', available: true },
  { day: '02', available: true },
  { day: '03', available: true },
  { day: '04', available: true },
  { day: '05', available: true },
  { day: '06', available: true },
  { day: '07', available: true },
  { day: '08', available: true },
  { day: '09', available: true },
  { day: '10', available: true },
  { day: '11', available: true },
  { day: '12', available: true },
  { day: '13', available: true },
  { day: '14', available: true },
  { day: '15', available: true },
  { day: '16', available: true },
  { day: '17', available: true },
  { day: '18', available: true },
  { day: '19', available: true },
  { day: '20', available: true },
  { day: '21', available: true },
  { day: '22', available: true },
  { day: '23', available: true },
  { day: '24', available: true },
  { day: '25', available: true },
  { day: '26', available: true },
  { day: '27', available: true },
  { day: '28', available: true },
  { day: '29', available: true },
  { day: '30', available: true },
];

describe('Dashboard page', () => {
  it('should be able render dashboard', () => {
    apiMock
      .onGet(`/providers/${authDataMock.user.id}/month-availability`)
      .reply(200, monthAvailableDataMock);
    apiMock.onGet('/appointments/me').reply(200, appointmentDataMOck);

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      const storage = {
        [`${process.env.REACT_APP_LOCALSTORAGE_PREFIX}:token`]: authDataMock.token,
        [`${process.env.REACT_APP_LOCALSTORAGE_PREFIX}:user`]: JSON.stringify(
          authDataMock.user,
        ),
      };

      return storage[key];
    });

    const { getByTitle, getByText, getAllByRole } = render(
      <AppProvider>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </AppProvider>,
    );

    wait(() => {
      const calendarButton = getByText(
        `${new Date().getDate() + 4}`.padStart(2, '00'),
      );

      fireEvent.click(calendarButton);
    });

    act(() => {
      const [, changeMonthButton] = getAllByRole('button');

      fireEvent.click(changeMonthButton);
    });

    const exitButton = getByTitle('Sair do GoBarber');
    expect(exitButton).toBeTruthy();
  });
});
