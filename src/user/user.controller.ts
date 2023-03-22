import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ClassSerializerInterceptor,
  UseInterceptors,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from './entities/roles';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
