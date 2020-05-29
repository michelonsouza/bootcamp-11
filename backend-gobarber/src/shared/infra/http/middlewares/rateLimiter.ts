import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import AppError from '@shared/errors/AppError';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
  enable_offline_queue: false,
});

const limiterOptions = {
  points: 5,
  duration: 5,
  blockDuration: 30,
};

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  ...limiterOptions,
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const setHeaders = (opts: any): any => ({
    'Retry-After': opts.msBeforeNext / 1000,
    'X-RateLimit-Limit': limiterOptions.points,
    'X-RateLimit-Remaining': opts.remainingPoints,
    'X-RateLimit-Reset': new Date(Date.now() + opts.msBeforeNext),
  });

  try {
    const limiterResponse = await limiter.consume(request.ip);

    response.set(setHeaders(limiterResponse));

    return next();
  } catch (error) {
    response.set(setHeaders(error));

    throw new AppError('Too many requests', 429);
  }
}
