import {
  Controller,
  Post,
  Body,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { Tokens } from './types/token.interface';
import { AuthDto } from './dto/auth.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { GetCurrentUserField } from 'src/decorators/get-current-user-decorator';
import { Public } from 'src/decorators/public.decorator';
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() user: AuthDto): Promise<User> {
    return this.authService.register(user);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: AuthDto): Promise<Tokens> {
    return this.authService.login(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @GetCurrentUserField('userId') userId: string,
    @GetCurrentUserField('refreshToken') token: string,
  ) {
    return this.authService.refresh(userId, token);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@GetCurrentUserField('userId') userId: string) {
    return this.authService.logout(userId);
  }
}
