import { GamesRepository } from "../GamesRepository";

jest.mock('../../data/new_DB.json', () => ({
  'god-of-war-ascension': {
    IGDBSlug: 'god-of-war-ascension',
    AllGenres: [{ name: "Hack and slash/Beat 'em up" }, { name: 'Adventure' }],
    Summary: 'Vengeance is born in the fires of betrayal in this prequel...',
    Rating: [{ rating: 11 }, { rating: 5 }],
    GameModes: [{ name: 'Single player' }, { name: 'Multiplayer' }],
  },
}));

describe('GamesRepository', () => {
  test('getAllGames should return the game "God of War: Ascension"', () => {
    const gamesRepository = new GamesRepository();
    const allGames = gamesRepository.getAllGames();

    expect(allGames['god-of-war-ascension']).toBeDefined();

    expect(allGames['god-of-war-ascension']).toEqual({
      IGDBSlug: 'god-of-war-ascension',
      AllGenres: [
        { name: "Hack and slash/Beat 'em up" },
        { name: 'Adventure' },
      ],
      Summary: 'Vengeance is born in the fires of betrayal in this prequel...',
      Rating: [{ rating: 11 }, { rating: 5 }],
      GameModes: [{ name: 'Single player' }, { name: 'Multiplayer' }],
    });
  });

  test('getAllGames should return the correct game details for "God of War: Ascension"', () => {
    const gamesRepository = new GamesRepository();
    const allGames = gamesRepository.getAllGames();

    const godOfWarAscension = allGames['god-of-war-ascension'];

    expect(godOfWarAscension.Summary).toContain(
      'Vengeance is born in the fires of betrayal',
    );
    expect(godOfWarAscension.Rating).toEqual([{ rating: 11 }, { rating: 5 }]);
    expect(godOfWarAscension.GameModes).toEqual([
      { name: 'Single player' },
      { name: 'Multiplayer' },
    ]);
  });
});
