import { Role } from 'src/user/entities/roles';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface TokenPayload {
  userId: string;
  login: string;
  role: Role;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  role: Role;
}
