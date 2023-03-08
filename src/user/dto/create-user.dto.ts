import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
