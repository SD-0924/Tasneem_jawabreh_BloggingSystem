import { Request, Response } from 'express';
import User from '../models/User';  

export const createUser = (req: Request, res: Response) => {
    console.log("Request Body:", req.body);
  User.create({
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
  })
    .then((user) => {
      res.status(201).json(user);  // Respond with the created user
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

export const getUserById = (req: Request, res: Response) => {
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

export const updateUser = (req: Request, res: Response) => {
  const { userId } = req.params;

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
        throw new Error('UserNotFound');
      }
    })
    .then((updatedUser) => {
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch((error) => {
      if (error.message === 'UserNotFound') {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(500).json({ error: 'Failed to update user' });
      }
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
