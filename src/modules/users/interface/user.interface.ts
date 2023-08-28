export interface IUserCreateInterface {
  id?: number;
  username: string;
  email: string;
  password: string;
  stir: string;
  phone: string;
  about: string;
  created_at: Date;
}

export interface IUserUpdateInterface extends IUserCreateInterface {}
