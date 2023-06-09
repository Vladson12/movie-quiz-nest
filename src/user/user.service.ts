import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
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

  async findMe() {
    return null;
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    const foundUser = await this.usersRepository.findOneBy({ id });
    if (!foundUser) {
      throw new NotFoundException('User with such id not found');
    }
    return foundUser;
  }

  async remove(id: string) {
    await this.findOne(id);
    this.usersRepository.delete(id);
  }
}
