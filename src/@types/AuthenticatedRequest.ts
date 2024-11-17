import { Request } from 'express';

// Define the type of the user object in the request
interface AuthenticatedUser {
  userID: number;
  // Add more user properties if needed
}

// Extend the Request type to include `user`
interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

export default AuthenticatedRequest;
