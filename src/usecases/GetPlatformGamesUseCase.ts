import { GamesRepository } from '../repositories/GamesRepository';

export class GetPlatformGamesUseCase {
  private readonly gamesRepository: GamesRepository;

  constructor(gamesRepository: GamesRepository) {
    this.gamesRepository = gamesRepository;
  }

  execute(platformName: string, psPlusFilter: boolean = false): string[] {
    const typedData = this.gamesRepository.getAllGames();
    const platformGames: string[] = [];

    for (const key in typedData) {
      const game = typedData[key];

      const isPsPlus = game?.GameService?.includes('psplus');
      const isPlatformGame = game?.Platforms?.some(
        (p) => p?.name === platformName,
      );

      if ((!psPlusFilter || (psPlusFilter && isPsPlus)) && isPlatformGame) {
        platformGames.push(key);
      }
    }

    return platformGames;
  }
}
