import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  async create(createGameDto: CreateGameDto, playerId: string) {
    const gameToCreate = new Game({
      ...createGameDto,
      player: playerId,
    });

    const createdGame = this.gamesRepository.create(gameToCreate);
    return this.gamesRepository.save(createdGame);
  }

  async findAll() {
    return this.gamesRepository.find();
  }

  async findOne(id: string) {
    const foundGame = await this.gamesRepository.findOneBy({ id });
    if (!foundGame) {
      throw new NotFoundException('Game with such id not found');
    }
    return foundGame;
  }

  async remove(id: string) {
    await this.findOne(id);
    this.gamesRepository.delete(id);
  }
}
