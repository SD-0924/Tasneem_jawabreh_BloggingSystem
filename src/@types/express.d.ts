// src/@types/express.d.ts

import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // or whatever type you want to assign
    }
  }
}