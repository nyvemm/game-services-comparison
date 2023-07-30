import { Request } from 'express';
import { GetPlatformGamesDTO } from '../dto/GetPlatformGamesDTO';
import { GamesRepository } from '../repositories/GamesRepository';
import { GetPlatformGamesUseCase } from '../usecases/GetPlatformGamesUseCase';

export class GamesController {
  private readonly gamesRepository: GamesRepository;
  private readonly getPlatformGamesUseCase: GetPlatformGamesUseCase;

  constructor() {
    this.gamesRepository = new GamesRepository();
    this.getPlatformGamesUseCase = new GetPlatformGamesUseCase(
      this.gamesRepository,
    );
  }

  getPlatformGames(req: Request): string[] {
    const dto: GetPlatformGamesDTO = {
      platformName: req.query.platformName as string,
      psPlus: req.query.psPlus === 'true',
    };

    if (
      typeof dto.platformName !== 'string' ||
      dto.platformName.trim() === ''
    ) {
      return [];
    }

    const platformGames = this.getPlatformGamesUseCase.execute(
      dto.platformName,
      dto.psPlus,
    );

    return platformGames;
  }
}
