import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  id?: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  stir: string;

  @IsNotEmpty()
  @IsString()
  about: string;

  created_at: Date;
}
