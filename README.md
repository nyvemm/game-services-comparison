# Game Services Comparison - Your Street-Level Game Finder

## Let's Get Rollin'

Wanna keep this local? Do these things:

1. Make a copy, homie:
\```
git clone git@github.com:nyvemm/game-services-comparison.git
\```
2. Gear up with the right tools:
\```
npm install
\```

## What's it do?

This project's your street-wise guide to game services, helping you compare and choose. It's got scripts to get you started, build up, test, and all that good stuff.

### The Main Players

- `start`: Fires up the app in the lab, keepin' an eye out for any changes and reloads the server.
- `build`: Turns TypeScript into JavaScript, straight up.
- `test`: Runs a check-up with Jest.

### The Other Homies

- `generate-swagger`: Cooks up the Swagger docs.
- `serve-swagger`: Puts the Swagger docs on the street.
- `lint`: Keeps your code looking fresh.
- `format`: Keeps your code neat with Prettier.

To call a script into action, say `npm run` followed by the script's name. Like, to start the server, you'd type `npm run start`.

## An Example Endpoint

Check out how an endpoint looks:

\```javascript
router.get(
  '/games',
  cacheMiddleware<Game[]>(3600000, generateCacheKey),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const games = gamesController.getPlatformGames(req);
      res.json(games);
    } catch (error) {
      next(error);
    }
  },
);
\```

This right here is the `/games` spot. Uses middleware to stash the results, then pulls up games for a specific platform and sends 'em out. If things get twisted, it tosses the problem to the next middleware.

## Hit Me Up

Got questions? Reach out to the man behind it all at:

- Email: [joaovictorsawada@gmail.com](mailto:joaovictorsawada@gmail.com)

## Street Rules

This project's under the ISC License, straight up.
