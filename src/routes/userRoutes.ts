import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/UserController';

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:userId', getUserById);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;
