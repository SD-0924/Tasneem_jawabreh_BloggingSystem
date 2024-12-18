"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostController_1 = require("../controllers/PostController");
const router = (0, express_1.Router)();
router.post('/', PostController_1.createPost);
router.get('/', PostController_1.getPosts);
router.get('/:postId', PostController_1.getPostById);
router.put('/:postId', PostController_1.updatePost);
router.delete('/:postId', PostController_1.deletePost);
//router.post('/:postId/categories', addCategoryToPost);
//router.post('/:postId/comments', addCommentToPost);
exports.default = router;
