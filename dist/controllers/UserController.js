"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (req, res) => {
    User_1.default.create({
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
    })
        .then((user) => {
        const token = jsonwebtoken_1.default.sign({ userId: user.userID, userName: user.userName }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.status(201).json({ user, token });
    })
        .catch(() => {
        res.status(500).json({ error: 'Failed to create user' });
    });
};
exports.createUser = createUser;
const getUsers = (req, res) => {
    User_1.default.findAll()
        .then((users) => {
        res.status(200).json(users); // Respond with all users
    })
        .catch((error) => {
        res.status(500).json({ error: 'Failed to retrieve users' });
    });
};
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield User_1.default.findByPk(userId);
        if (user) {
            res.status(200).json(user); // Send the user response
        }
        else {
            res.status(404).json({ error: 'User not found' }); // Send a 404 response
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user' }); // Handle unexpected errors
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => {
    const { userId } = req.params;
    User_1.default.update({
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
    }, {
        where: { userID: userId },
    })
        .then(([affectedCount]) => {
        if (affectedCount > 0) {
            // Fetch the updated user to respond with the latest data
            return User_1.default.findByPk(userId);
        }
        else {
            throw new Error('UserNotFound');
        }
    })
        .then((updatedUser) => {
        if (updatedUser) {
            res.status(200).json(updatedUser);
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }
    })
        .catch((error) => {
        if (error.message === 'UserNotFound') {
            res.status(404).json({ error: 'User not found' });
        }
        else {
            res.status(500).json({ error: 'Failed to update user' });
        }
    });
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    const { userId } = req.params;
    User_1.default.destroy({ where: { userID: userId } })
        .then((deletedCount) => {
        if (deletedCount > 0) {
            res.status(204).send(); // Respond with no content after deletion
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }
    })
        .catch((error) => {
        res.status(500).json({ error: 'Failed to delete user' });
    });
};
exports.deleteUser = deleteUser;
