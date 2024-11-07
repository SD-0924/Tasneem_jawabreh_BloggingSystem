import { Router } from 'express';
import { createComment, getComments, getCommentById, updateComment, deleteComment } from '../controllers/commentController';

const router = Router();

router.post('/', createComment);
router.get('/', getComments);
router.get('/:commentId', getCommentById);
router.put('/:commentId', updateComment);
router.delete('/:commentId', deleteComment);

export default router;
