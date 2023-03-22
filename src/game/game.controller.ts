import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/user/entities/roles';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.PLAYER)
  async create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessGuard)
  async findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessGuard)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.gameService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.gameService.remove(id);
  }
}
