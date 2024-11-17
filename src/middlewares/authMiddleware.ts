import { Response, NextFunction } from 'express';
import passport from 'passport';
import AuthenticatedRequest from '../@types/AuthenticatedRequest'; // Import the custom request type

export const authenticate = passport.authenticate('jwt', { session: false });

export const authorize = (
  req: AuthenticatedRequest, // Use the custom type
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  const authenticatedUser = req.user; // Now TypeScript knows `user` exists on `req`

  if (authenticatedUser.userID !== parseInt(userId)) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }

  next();
};
