import { Router } from 'express';
import { 
  createPost, 
  getPosts, 
  getPostById, 
  updatePost, 
  deletePost 
} from '../controllers/PostController';
import { authenticate } from '../middlewares/authMiddleware';
//import { authorizePostOwner } from '../middlewares/authorizationMiddleware';

const router = Router();

// Routes with authentication and authorization
router.post('/', authenticate, createPost); // Authenticated users can create posts
router.get('/', authenticate, getPosts); // Authenticated users can view posts
router.get('/:postId', authenticate, getPostById); // Authenticated users can view specific posts
router.put('/:postId', authenticate, updatePost); // Only post owners can update
router.delete('/:postId', authenticate,  deletePost); // Only post owners can delete


// router.post('/:postId/categories', authenticate, addCategoryToPost);
// router.post('/:postId/comments', authenticate, addCommentToPost);

export default router;
