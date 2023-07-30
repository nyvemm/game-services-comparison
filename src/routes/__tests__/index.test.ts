import * as cacheModule from "../../middlewares/cache";
import app from "../../server";
import request from "supertest";
import { Request, Response } from "express";
import { GamesController } from "../../controllers/GamesController";

describe('GET /games', () => {
  const getPlatformGamesSpy = jest.spyOn(
    GamesController.prototype,
    'getPlatformGames',
  );

  const cacheMiddlewareMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest
      .spyOn(cacheModule, 'cacheMiddleware')
      .mockImplementation(cacheMiddlewareMock);
  });

  it('should respond with a list of games for the specified platform', async () => {
    getPlatformGamesSpy.mockImplementation((req: Request) => {
      const platformName = req.query.platformName as string;

      if (platformName === 'PlayStation 5') {
        return ['game1', 'game2', 'game3'];
      } else {
        throw new Error('An error occurred while fetching games.');
      }
    });

    const response = await request(app).get('/games').query({
      platformName: 'PlayStation 5',
      psPlus: 'true',
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(['game1', 'game2', 'game3']);
    expect(getPlatformGamesSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        query: { platformName: 'PlayStation 5', psPlus: 'true' },
      }),
    );
  });

  it('should handle errors and call the error-handling middleware', async () => {
    getPlatformGamesSpy.mockImplementation((req: Request) => {
      const platformName = req.query.platformName as string;

      if (platformName !== 'PlayStation 5') {
        throw new Error('An error occurred while fetching games.');
      }
      return ['game1', 'game2', 'game3'];
    });

    const response = await request(app).get('/games').query({
      platformName: 'PlayStation 4',
      psPlus: 'false',
    });

    expect(response.status).toBe(500);

    expect(getPlatformGamesSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        query: { platformName: 'PlayStation 4', psPlus: 'false' },
      }),
    );
  });
});
