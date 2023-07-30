import { NextFunction, Request, Response, Router } from 'express';
import { GamesController } from '../controllers/GamesController';
import { Game } from '../domain/Games';
import { cacheMiddleware, generateCacheKey } from '../middlewares/cache';

const gamesController = new GamesController();
const router = Router();

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Endpoint to get games for a specific platform
 *     description: Returns a list of games for the specified platform.
 *     parameters:
 *       - in: query
 *         name: platformName
 *         required: true
 *         description: Select the platform.
 *         schema:
 *           type: string
 *           enum: [PlayStation 5, PlayStation 4, PlayStation 3, Nintendo Switch]
 *       - in: query
 *         name: psPlus
 *         required: false
 *         description: Filter by PS Plus availability (true or false). Default is true.
 *         schema:
 *           type: boolean
 *           default: true
 *     responses:
 *       200:
 *         description: Successful response with a list of games for the specified platform.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               example:
 *                 - "game1"
 *                 - "game2"
 *                 - "game3"
 *     tags:
 *       - Platform
 */
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

export default router;
