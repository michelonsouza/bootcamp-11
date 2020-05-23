import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class FakeUserRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({ name, email, password }: ICreateDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), name, email, password });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(findUser => findUser.email === email);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(findUser => findUser.id === id);

    return user;
  }
}

export default FakeUserRepository;
