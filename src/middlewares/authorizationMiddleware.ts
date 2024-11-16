/*import { Request, Response, NextFunction } from 'express';
import Post from '../models/Post';
import  AuthenticatedRequest  from './authMiddleware';

export const authorizePostOwner = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  const userId = req.user?.id;

  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.userID !== userId) {
      return res.status(403).json({ error: 'Unauthorized: You do not own this post' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Authorization failed', details: error.message });
  }
};*/
