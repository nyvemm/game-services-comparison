interface Genre {
  name?: string;
}

interface Company {
  id?: number;
  company?: {
    name?: string;
    url?: string;
    parent?: number | null;
  };
  developer?: boolean;
  publisher?: boolean;
}

interface GameMode {
  name?: string;
}

interface Video {
  name?: string | null;
  video_id?: string;
}

interface Platform {
  id?: number;
  name?: string;
}

interface Rating {
  category?: number | null;
  rating?: number | null;
}

interface Theme {
  id?: number;
  name?: string;
}

export interface Game {
  AllGenres?: Genre[] | null;
  Summary?: string | null;
  Companies?: Company[] | null;
  GameModes?: GameMode[] | null;
  Videos?: Video[] | null;
  Platforms?: Platform[] | null;
  ReleaseYear?: number | null;
  FullDate?: number | null;
  GameService?: string | null;
  MetaCriticScore?: string | number | null;
  MetaCriticUserScore?: string | number | null;
  onService?: number | null;
  metaConsole?: string | null;
  hltb?: {
    id?: number | string | null;
    game_name?: string | null;
    comp_main?: number | null;
    comp_plus?: number | null;
    comp_100?: number | null;
    comp_all?: number | null;
    invested_co?: number | null;
    invested_mp?: number | null;
  };
  IGDBSlug?: string | null;
  Rating?: Rating[] | null;
  Themes?: Theme[] | null;
  metacr?: string | null;
  metaur?: string | null;
  SpecificService?: string;
  d?: string;
  ds?: string;
  gt?: string | null;
  ct?: string | null;
  iu?: string | null;
}

export type Games = {
  [gameName: string]: Game;
};
