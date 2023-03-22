import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role, roleValues } from '../entities/roles';
import { IsUserrole } from 'src/decorators/is-userrole.decorator';

export class CreateUserDto {
  @IsEmail()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsUserrole({ message: `role must be on of the following: ${roleValues}` })
  role: Role;
}
