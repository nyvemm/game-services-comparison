import cache from "memory-cache";
import { NextFunction, Request, Response } from "express";

type CachedResponse<T> = T | null;

export const generateCacheKey = (req: Request): string => {
  const { url, query } = req;
  return `${url}?${JSON.stringify(query)}`;
};

export const cacheMiddleware = <T>(
  cacheDuration: number,
  generateCacheKey: (req: Request) => string,
) => {
  return (
    req: Request,
    res: Response<CachedResponse<T>>,
    next: NextFunction,
  ) => {
    const cacheKey = generateCacheKey(req);
    const cachedData = cache.get(cacheKey) as CachedResponse<T>;
    if (cachedData !== null) {
      return res.json(cachedData);
    }

    const originalJson = res.json.bind(res);
    res.json = (body?: CachedResponse<T>): Response<CachedResponse<T>> => {
      if (body !== undefined) {
        cache.put(cacheKey, body, cacheDuration);
      }
      return originalJson(body);
    };

    next();
  };
};
