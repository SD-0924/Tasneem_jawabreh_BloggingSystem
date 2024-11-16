import { Request, Response } from 'express';
import Post from '../models/Post';
import Category from '../models/Category';
import Comment from '../models/Comment';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import  AuthenticatedRequest  from '../@types/AuthenticatedRequest'; // Custom type for authenticated requests

// Middleware to authenticate using Passport JWT
import passport from 'passport';
export const createPost = (req: AuthenticatedRequest, res: Response) => {
    const { title, content, userID } = req.body;
    console.log("Request Body:", req.body);
    Post.create({ title, content, userID })
        .then((post) => {
            res.status(201).json(post); 
        })
        .catch((error) => {
            console.error('Error creating post:', error);  // Log the error for debugging
      res.status(500).json({ error: 'Failed to create post', details: error.message });
        });
};

export const getPosts = (req: AuthenticatedRequest, res: Response) => {
    Post.findAll({
        include: [
          {
            model: User,
            as: 'user', // Make sure 'user' is the alias you used in the model association
            attributes: ['userName'], // Only retrieve the 'userName' attribute from the User model
          },
        ],
      })
        .then((posts) => {
          res.status(200).json(posts); // Respond with all posts, including user details
        })
        .catch((error) => {
          console.error(error); // Log the error for better debugging
          res.status(500).json({ error: 'Failed to retrieve posts' });
        });
  };
  

export const getPostById = (req: AuthenticatedRequest, res: Response) => {
    const { postId } = req.params;

    Post.findByPk(postId, {
        include: [
            {
              model: User,
              as: 'user', // Make sure 'user' is the alias you used in the model association
              attributes: ['userName'], // Only retrieve the 'userName' attribute from the User model
            },
          ],
    })
        .then((post) => {
            if (post) {
                res.status(200).json(post); // Respond with the post if found
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to retrieve post' });
        });
};

export const updatePost = (req: AuthenticatedRequest, res: Response) => {
    console.log("Controller function called");
    const { postId } = req.params;
    const { title, content } = req.body;

    Post.update({ title, content }, { where: { postID: postId } })
        .then(([updatedRowsCount]) => {
            if (updatedRowsCount > 0) {
                // Fetch the updated post to respond with the latest data
                return Post.findByPk(postId);
            } else {
                throw new Error('PostNotFound');
            }
        })
        .then((updatedPost) => {
            if (updatedPost) {
                res.status(200).json(updatedPost); // Respond with the updated post
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        })
        .catch((error) => {
            if (error.message === 'PostNotFound') {
                res.status(404).json({ error: 'Post not found' });
            } else {
                res.status(500).json({ error: 'Failed to update post' });
            }
        });
};

export const deletePost = (req: AuthenticatedRequest, res: Response) => {
    const { postId } = req.params;

    Post.destroy({ where: { postID: postId } })
        .then((deletedCount) => {
            if (deletedCount > 0) {
                res.status(204).send(); // Respond with no content after deletion
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to delete post' });
        });
};

/*export const addCommentToPost = (req: Request, res: Response) => {
    const { postId } = req.params;
    const { userId, content } = req.body;

    Post.findByPk(postId)
        .then((post) => {
            if (post) {
                return Comment.create({ postID, userID, content });
            } else {
                throw new Error('PostNotFound');
            }
        })
        .then((comment) => {
            res.status(201).json(comment); // Respond with the created comment
        })
        .catch((error) => {
            if (error.message === 'PostNotFound') {
                res.status(404).json({ error: 'Post not found' });
            } else {
                res.status(500).json({ error: 'Failed to add comment to post' });
            }
        });
};*/
