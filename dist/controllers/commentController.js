"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComment = exports.getCommentById = exports.getComments = exports.createComment = void 0;
const Comment_1 = __importDefault(require("../models/Comment")); // Import Comment model
const User_1 = __importDefault(require("../models/User")); // Import User model (if needed for associations)
const Post_1 = __importDefault(require("../models/Post")); // Import Post model (if needed for associations)
// Create a new comment
const createComment = (req, res) => {
    const { content, userID, postID } = req.body;
    // Validate request data
    if (!content || !userID || !postID) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }
    Comment_1.default.create({ content, userID, postID })
        .then(comment => {
        res.status(201).json(comment);
        return; // Ensure void is returned
    })
        .catch(error => {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Failed to create comment' });
    });
};
exports.createComment = createComment;
// Retrieve all comments
const getComments = (req, res) => {
    Comment_1.default.findAll({
        include: [
            { model: User_1.default, as: 'user', attributes: ['userName'] },
            { model: Post_1.default, as: 'post', attributes: ['title'] }
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
exports.getComments = getComments;
// Retrieve a comment by ID
const getCommentById = (req, res) => {
    const { commentID } = req.params;
    Comment_1.default.findByPk(commentID, {
        include: [
            { model: User_1.default, as: 'user', attributes: ['userName'] },
            { model: Post_1.default, as: 'post', attributes: ['title'] }
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
exports.getCommentById = getCommentById;
// Update a comment by ID
const updateComment = (req, res) => {
    const { commentID } = req.params;
    const { content } = req.body;
    Comment_1.default.findByPk(commentID)
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
exports.updateComment = updateComment;
