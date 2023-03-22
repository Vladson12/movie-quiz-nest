import {
  Controller,
  Post,
  Body,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { Tokens } from './types/token.interface';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('signup')
  async signup(@Body() user: AuthDto): Promise<User> {
    return this.authService.register(user);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() user: AuthDto): Promise<Tokens> {
    return this.authService.login(user);
  }

  @HttpCode(200)
  @Post('refresh')
  async refresh(@Body('refreshToken') token: string) {
    return this.authService.refresh(token);
  }
}
