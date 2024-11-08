import { Request, Response } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/UserController';
import User from '../models/User';
import { mockRequest, mockResponse } from './testUtils';

// Mock the User model methods
jest.mock('../models/User');

describe('User Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user and return 201', async () => {
      const mockUser = { id: 1, userName: 'testuser', email: 'testuser@example.com' };
      (User.create as jest.Mock).mockResolvedValue(mockUser);

      req.body = { userName: 'testuser', email: 'testuser@example.com', password: 'password123' };

      await createUser(req as Request, res as Response);

      expect(User.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

  });

  describe('getUsers', () => {
    it('should retrieve all users and return 200', async () => {
      const mockUsers = [{ id: 1, userName: 'testuser', email: 'testuser@example.com' }];
      (User.findAll as jest.Mock).mockResolvedValue(mockUsers);

      await getUsers(req as Request, res as Response);

      expect(User.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });
  });

  describe('getUserById', () => {
    it('should retrieve a user by ID and return 200', async () => {
      const mockUser = { id: 1, userName: 'testuser', email: 'testuser@example.com' };
      (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

      req.params = { userId: '1' };

      await getUserById(req as Request, res as Response);

      expect(User.findByPk).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 404 if user not found', async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(null);

      req.params = { userId: '1' };

      await getUserById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });


  });


  describe('deleteUser', () => {
    it('should delete a user and return 204', async () => {
      (User.destroy as jest.Mock).mockResolvedValue(1);

      req.params = { userId: '1' };

      await deleteUser(req as Request, res as Response);

      expect(User.destroy).toHaveBeenCalledWith({ where: { userID: '1' } });
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return 404 if user not found during delete', async () => {
      (User.destroy as jest.Mock).mockResolvedValue(0);

      req.params = { userId: '1' };

      await deleteUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });


  });
});
