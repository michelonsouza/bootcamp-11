import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequestDTO): Promise<User> {
    let user = await this.usersRepository.findByEmail(email);

    if (user) {
      throw new AppError('E-mail address already used.');
    }

    const hashadPassword = await this.hashProvider.generateHash(password);

    user = await this.usersRepository.create({
      name,
      email,
      password: hashadPassword,
    });

    return user;
  }
}

export default CreateUserService;
