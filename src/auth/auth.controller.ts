import {
  Controller,
  Post,
  Body,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Tokens } from './types/token.interface';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('signup')
  async signup(@Body() user: CreateUserDto): Promise<User> {
    return this.authService.register(user);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() user: CreateUserDto): Promise<Tokens> {
    return this.authService.login(user);
  }

  @HttpCode(200)
  @Post('refresh')
  async refresh(@Body('refreshToken') token: string) {
    return this.authService.refresh(token);
  }
}
