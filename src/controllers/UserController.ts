import { Request, Response } from 'express';
import User from '../models/User';  
import jwt from 'jsonwebtoken';
import  AuthenticatedRequest  from '../@types/AuthenticatedRequest'; // Custom type for authenticated requests

// Middleware to authenticate using Passport JWT
import passport from 'passport';
export const createUser = (req: Request, res: Response) => {
  console.log('Request Body:', req.body);
  User.create({
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
  })
    .then((user) => {
      const payload = { id: user.userID, userName: user.userName }; // Payload for JWT
      const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1d' }); // Generate JWT
      console.log(token);
      res.status(201).json({ user, token }); // Respond with user and JWT
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to create user' });
    });
};

export const getUsers = (req: Request, res: Response) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);  // Respond with all users
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to retrieve users' });
    });
};

export const getUserById = (req: AuthenticatedRequest, res: Response) => {
  const { userId } = req.params;
  User.findByPk(userId)
    .then((user) => {
      if (user) {
        res.status(200).json(user);  // Respond with the user if found
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to retrieve user' });
    });
};

export const updateUser = (req: AuthenticatedRequest, res: Response) => {
  const { userId } = req.params;

  // First, update the user with the provided data
  User.update(
    {
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
    },
    {
      where: { userID: userId },
    }
  )
    .then(([affectedCount]) => {
      if (affectedCount > 0) {
        // Fetch the updated user to respond with the latest data
        return User.findByPk(userId);
      } else {
        // If no rows were affected, treat it as the user not being found
        return null;
      }
    })
    .then((updatedUser) => {
      if (updatedUser) {
        res.status(200).json(updatedUser); // Respond with the updated user
      } else {
        res.status(404).json({ error: 'User not found' }); // No user found to update
      }
    })
    .catch((error) => {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' }); // Handle unexpected errors
    });
};



export const deleteUser = (req: Request, res: Response) => {
  const { userId } = req.params;
  User.destroy({ where: { userID: userId } })
    .then((deletedCount) => {
      if (deletedCount > 0) {
        res.status(204).send();  // Respond with no content after deletion
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to delete user' });
    });
};
