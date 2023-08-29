import { BadRequestException, Injectable } from '@nestjs/common';
import {
  IUserCreateInterface,
  IUserUpdateInterface,
} from './interface/user.interface';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class UsersService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  // ok
  async findAll(): Promise<IUserCreateInterface[]> {
    return await this.knex('users').returning('*');
  }

  // ok
  async findOne(id: number) {
    const result = await this.findUser(id);

    return result;
  }

  // ok
  async update(
    id: number,
    data: Omit<IUserUpdateInterface, 'password'>,
  ): Promise<Omit<IUserCreateInterface, 'password'>> {
    const result = await Promise.all([
      this.knex('users').where('id', id).select('*').first(),
      this.knex('users')
        .where({ email: data.email })
        .whereNot('id', id)
        .first(),
    ]);

    if (!result) throw new BadRequestException('This is not found user!');

    return await this.knex('users').where('id', id).update(data);
  }

  // ok
  async remove(id: number): Promise<string> {
    const user = await this.findUser(id);

    return await this.knex('users').where('id', user.id).del();
  }

  async findUser(id: number): Promise<IUserCreateInterface> {
    if (id) {
      const findUser = await this.knex('users')
        .where('id', id)
        .select('-password')
        .first();

      if (!findUser)
        throw new BadRequestException('This is id exists or not found!');

      return findUser;
    }

    throw new BadRequestException('Id is not found or id is not exsits');
  }
}
