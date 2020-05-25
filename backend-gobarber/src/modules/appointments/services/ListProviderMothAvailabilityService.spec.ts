// import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMothAvailabilityService';

// let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    // fakeUsersRepository = new FakeUsersRepository();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list month availability from provider', async () => {
    await Promise.all(
      Array.from({ length: 10 }, (_, index) =>
        fakeAppointmentsRepository.create({
          date: new Date(2020, 4, 28, index + 8, 0, 0),
          provider_id: 'user',
        }),
      ),
    );

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 27, available: true },
        { day: 28, available: false },
        { day: 29, available: true },
        { day: 30, available: true },
      ]),
    );
  });
});
