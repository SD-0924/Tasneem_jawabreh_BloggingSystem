import express from 'express';
import { 
  createUser, 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} from '../controllers/UserController';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', createUser); // Open endpoint for user registration

router.get('/', authenticate, getUsers); // Only authenticated users can get all users

router.get('/:userId', authenticate,  getUserById); // Protect access to individual profiles

router.put('/:userId', authenticate, updateUser);
router.delete('/:userId', authenticate,  deleteUser); // Protect user deletion

export default router;
