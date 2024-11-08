import { Router } from 'express';
import { createComment, getComments, getCommentById, updateComment } from '../controllers/commentController';

const router = Router();

router.post('/', createComment);
router.get('/', getComments);
router.get('/:commentID', getCommentById);
router.put('/:commentID', updateComment);
//router.delete('/:commentId', deleteComment);

export default router;
