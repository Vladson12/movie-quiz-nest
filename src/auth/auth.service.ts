import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { TokenPayload, Tokens } from './types/token.interface';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const foundUser = await this.usersRepository.findOne({
      where: { login: createUserDto.login },
    });
    if (foundUser) {
      throw new BadRequestException('User with such login already exists');
    }

    const currentTimestamp = Date.now();
    const userToCreate = new User({
      ...createUserDto,
      password: await hash(createUserDto.password, +process.env.CRYPT_SALT),
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    });

    const createdUser = this.usersRepository.create(userToCreate);
    return this.usersRepository.save(createdUser);
  }

  async login(createUserDto: CreateUserDto): Promise<Tokens> {
    const foundUser = await this.usersRepository.findOne({
      where: { login: createUserDto.login },
    });
    if (!foundUser) {
      throw new ForbiddenException("User with such login doesn't exist");
    }
    const isPasswordCorrect = await compare(
      createUserDto.password,
      foundUser.password,
    );

    if (!isPasswordCorrect) {
      throw new ForbiddenException('Wrong password');
    }

    const tokens = await this.getTokenPair({
      userId: foundUser.id,
      login: foundUser.login,
    });

    this.usersRepository.update(foundUser.id, {
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }

  async refresh(token: string) {
    await this.verify(token);

    const decodedToken = this.jwtService.decode(token);
    const foundUser = await this.usersRepository.findOne({
      where: { id: decodedToken['userId'] },
    });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    if (foundUser.refreshToken !== token) {
      throw new ForbiddenException('Token invalid or expired');
    }

    const tokens = await this.getTokenPair({
      userId: foundUser.id,
      login: foundUser.login,
    });

    this.usersRepository.update(foundUser.id, {
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }

  private async getTokenPair(payload: TokenPayload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private async verify(token: string) {
    try {
      return this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException('Token invalid');
    }
  }
}
