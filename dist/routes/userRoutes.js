"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const UserController_1 = require("../controllers/UserController");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.default, UserController_1.createUser);
router.get('/', authMiddleware_1.default, UserController_1.getUsers);
router.get('/:userId', authMiddleware_1.default, UserController_1.getUserById);
router.put('/:userId', authMiddleware_1.default, UserController_1.updateUser);
router.delete('/:userId', authMiddleware_1.default, UserController_1.deleteUser);
exports.default = router;
