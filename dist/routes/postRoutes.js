"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PostController_1 = __importDefault(require("../controllers/PostController"));
const router = express_1.default.Router();
router.post('/', PostController_1.default.createPost);
router.get('/', PostController_1.default.getAllPosts);
router.get('/:postId', PostController_1.default.getPostById);
router.put('/:postId', PostController_1.default.updatePost);
router.delete('/:postId', PostController_1.default.deletePost);
router.post('/:postId/categories', PostController_1.default.addCategory);
router.get('/:postId/categories', PostController_1.default.getCategories);
router.post('/:postId/comments', PostController_1.default.addComment);
router.get('/:postId/comments', PostController_1.default.getComments);
exports.default = router;
