"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPostById = exports.getPosts = exports.createPost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const User_1 = __importDefault(require("../models/User"));
const createPost = (req, res) => {
    const { title, content, userID } = req.body;
    console.log("Request Body:", req.body);
    Post_1.default.create({ title, content, userID })
        .then((post) => {
        res.status(201).json(post);
    })
        .catch((error) => {
        console.error('Error creating post:', error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to create post', details: error.message });
    });
};
exports.createPost = createPost;
const getPosts = (req, res) => {
    Post_1.default.findAll({
        include: [
            {
                model: User_1.default,
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
exports.getPosts = getPosts;
const getPostById = (req, res) => {
    const { postId } = req.params;
    Post_1.default.findByPk(postId, {
        include: [
            {
                model: User_1.default,
                as: 'user', // Make sure 'user' is the alias you used in the model association
                attributes: ['userName'], // Only retrieve the 'userName' attribute from the User model
            },
        ],
    })
        .then((post) => {
        if (post) {
            res.status(200).json(post); // Respond with the post if found
        }
        else {
            res.status(404).json({ error: 'Post not found' });
        }
    })
        .catch((error) => {
        res.status(500).json({ error: 'Failed to retrieve post' });
    });
};
exports.getPostById = getPostById;
const updatePost = (req, res) => {
    console.log("Controller function called");
    const { postId } = req.params;
    const { title, content } = req.body;
    Post_1.default.update({ title, content }, { where: { postID: postId } })
        .then(([updatedRowsCount]) => {
        if (updatedRowsCount > 0) {
            // Fetch the updated post to respond with the latest data
            return Post_1.default.findByPk(postId);
        }
        else {
            throw new Error('PostNotFound');
        }
    })
        .then((updatedPost) => {
        if (updatedPost) {
            res.status(200).json(updatedPost); // Respond with the updated post
        }
        else {
            res.status(404).json({ error: 'Post not found' });
        }
    })
        .catch((error) => {
        if (error.message === 'PostNotFound') {
            res.status(404).json({ error: 'Post not found' });
        }
        else {
            res.status(500).json({ error: 'Failed to update post' });
        }
    });
};
exports.updatePost = updatePost;
const deletePost = (req, res) => {
    const { postId } = req.params;
    Post_1.default.destroy({ where: { postID: postId } })
        .then((deletedCount) => {
        if (deletedCount > 0) {
            res.status(204).send(); // Respond with no content after deletion
        }
        else {
            res.status(404).json({ error: 'Post not found' });
        }
    })
        .catch((error) => {
        res.status(500).json({ error: 'Failed to delete post' });
    });
};
exports.deletePost = deletePost;
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
