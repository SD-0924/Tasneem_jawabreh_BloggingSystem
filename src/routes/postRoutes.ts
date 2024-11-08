import { Router } from 'express';
import { createPost, getPosts, getPostById, updatePost, deletePost, addCommentToPost } from '../controllers/PostController';

const router = Router();

router.post('/', createPost);
router.get('/', getPosts);
router.get('/:postId', getPostById);
router.put('/:postId', updatePost);
router.delete('/:postId', deletePost);
//router.post('/:postId/categories', addCategoryToPost);
router.post('/:postId/comments', addCommentToPost);

export default router;
