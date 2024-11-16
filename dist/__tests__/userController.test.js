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
const UserController_1 = require("../controllers/UserController");
const User_1 = __importDefault(require("../models/User"));
const testUtils_1 = require("./testUtils");
// Mock the User model methods
jest.mock('../models/User');
describe('User Controller', () => {
    let req;
    let res;
    beforeEach(() => {
        req = (0, testUtils_1.mockRequest)();
        res = (0, testUtils_1.mockResponse)();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('createUser', () => {
        it('should create a new user and return 201', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = { id: 1, userName: 'testuser', email: 'testuser@example.com' };
            User_1.default.create.mockResolvedValue(mockUser);
            req.body = { userName: 'testuser', email: 'testuser@example.com', password: 'password123' };
            yield (0, UserController_1.createUser)(req, res);
            expect(User_1.default.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        }));
    });
    describe('getUsers', () => {
        it('should retrieve all users and return 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUsers = [{ id: 1, userName: 'testuser', email: 'testuser@example.com' }];
            User_1.default.findAll.mockResolvedValue(mockUsers);
            yield (0, UserController_1.getUsers)(req, res);
            expect(User_1.default.findAll).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUsers);
        }));
    });
    describe('getUserById', () => {
        it('should retrieve a user by ID and return 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = { id: 1, userName: 'testuser', email: 'testuser@example.com' };
            User_1.default.findByPk.mockResolvedValue(mockUser);
            req.params = { userId: '1' };
            yield (0, UserController_1.getUserById)(req, res);
            expect(User_1.default.findByPk).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        }));
        it('should return 404 if user not found', () => __awaiter(void 0, void 0, void 0, function* () {
            User_1.default.findByPk.mockResolvedValue(null);
            req.params = { userId: '1' };
            yield (0, UserController_1.getUserById)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
        }));
    });
    describe('deleteUser', () => {
        it('should delete a user and return 204', () => __awaiter(void 0, void 0, void 0, function* () {
            User_1.default.destroy.mockResolvedValue(1);
            req.params = { userId: '1' };
            yield (0, UserController_1.deleteUser)(req, res);
            expect(User_1.default.destroy).toHaveBeenCalledWith({ where: { userID: '1' } });
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        }));
        it('should return 404 if user not found during delete', () => __awaiter(void 0, void 0, void 0, function* () {
            User_1.default.destroy.mockResolvedValue(0);
            req.params = { userId: '1' };
            yield (0, UserController_1.deleteUser)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
        }));
    });
});
