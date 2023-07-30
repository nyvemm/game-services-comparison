import data from '../data/new_DB.json';
import { Games } from '../domain/Games';

export class GamesRepository {
  private readonly typedData: Games;

  constructor() {
    this.typedData = data;
  }

  getAllGames(): Games {
    return this.typedData;
  }
}
