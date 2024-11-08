import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/UserController';

const router = express.Router();


router.post('/', createUser);  // create a new user
router.get('/', getUsers);  // get all users
router.get('/:userId', getUserById);  // get a user by ID
router.put('/:userId', updateUser);  //update a user by ID
router.delete('/:userId', deleteUser);  //delete a user by ID

export default router;
