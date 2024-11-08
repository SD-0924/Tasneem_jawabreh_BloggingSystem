import { Request, Response } from 'express';
import Comment from '../models/Comment'; // Import Comment model
import User from '../models/User'; // Import User model (if needed for associations)
import Post from '../models/Post'; // Import Post model (if needed for associations)

// Create a new comment
export const createComment = (req: Request, res: Response): void => {
    const { content, userID, postID } = req.body;

    // Validate request data
    if (!content || !userID || !postID) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    Comment.create({ content, userID, postID })
        .then(comment => {
            res.status(201).json(comment);
            return; // Ensure void is returned
        })
        .catch(error => {
            console.error('Error creating comment:', error);
            res.status(500).json({ error: 'Failed to create comment' });
        });
};

// Retrieve all comments
export const getComments = (req: Request, res: Response): void => {
    Comment.findAll({
        include: [
            { model: User, as: 'user', attributes: ['userName'] },
            { model: Post, as: 'post', attributes: ['title'] }
        ],
    })
        .then(comments => {
            res.status(200).json(comments);
            return; // Ensure void is returned
        })
        .catch(error => {
            console.error('Error retrieving comments:', error);
            res.status(500).json({ error: 'Failed to retrieve comments' });
        });
};

// Retrieve a comment by ID
export const getCommentById = (req: Request, res: Response): void => {
    const { commentID } = req.params;

    Comment.findByPk(commentID, {
        include: [
            { model: User, as: 'user', attributes: ['userName'] },
            { model: Post, as: 'post', attributes: ['title'] }
        ],
    })
        .then(comments => {
            if (!comments) {
                res.status(404).json({ error: 'Comment not found' });
                return;
            }
            res.status(200).json(comments);
        })
        .catch(error => {
            console.error('Error retrieving comment:', error);
            res.status(500).json({ error: 'Failed to retrieve comment' });
        });
};

// Update a comment by ID
export const updateComment = (req: Request, res: Response): void => {
    const { commentID } = req.params;
    const { content } = req.body;

    Comment.findByPk(commentID)
        .then(comment => {
            if (!comment) {
                res.status(404).json({ error: 'Comment not found' });
                return;
            }

            comment.content = content || comment.content;
            return comment.save();
        })
        .then(updatedComment => {
            if (updatedComment) {
                res.status(200).json(updatedComment);
            }
        })
        .catch(error => {
            console.error('Error updating comment:', error);
            res.status(500).json({ error: 'Failed to update comment' });
        });
};

