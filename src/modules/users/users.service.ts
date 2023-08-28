import { BadRequestException, Injectable } from '@nestjs/common';
import { IUserCreateInterface, IUserUpdateInterface } from './interface/user.interface';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class UsersService {
  constructor(
    @InjectKnex() private readonly knex: Knex,
  ) {}

  // ok
  async findAll(): Promise<IUserCreateInterface[]> {
    return await this.knex('users').returning('*');
  }

  // ok 
  async findOne(id: number) {
    const { password, ...result } = await this.findUser(id);

    return result
  }

  // ok
  async update(id: number, { password, ...data }: IUserUpdateInterface) {
    const result = await Promise.all([
      this.knex('users').where('id', id).select('*').first(),
      this.knex('users')
        .where({ email: data.email })
        .whereNot('id', id)
        .first(),
    ])

    console.log(result);
    
    // if (!updateUser) throw new BadRequestException('This is not found user!');

    // return updateUser;
  }

  // ok
  async remove(id: number): Promise<string> {
    const user = await this.findUser(id);

    return await this.knex('users').where('id', user.id).del();
  }

  async findUser(id: number): Promise<IUserCreateInterface> {
    if (id) {
      const findUser = await this.knex('users').where('id', id).first();
      
      if (!findUser) throw new BadRequestException('This is id exists or not found!');

      return findUser;
    }

    throw new BadRequestException('Id is not found or id is not exsits');

  }
}
