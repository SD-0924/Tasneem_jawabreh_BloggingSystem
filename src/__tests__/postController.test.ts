import { Request, Response } from 'express';
import { createPost, getPosts, getPostById, updatePost, deletePost } from '../controllers/PostController';
import Post from '../models/Post';
import { mockRequest, mockResponse } from './testUtils';

// Mock the Post model methods
jest.mock('../models/Post');

describe('Post Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPost', () => {
    it('should create a new post and return 201', async () => {
      const mockPost = { id: 1, title: 'My First Post', content: 'This is the content of my first post.', userID: 1 };
      (Post.create as jest.Mock).mockResolvedValue(mockPost);

      req.body = { title: 'My First Post', content: 'This is the content of my first post.', userID: 1 };

      await createPost(req as Request, res as Response);

      expect(Post.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockPost);
    });
  });

  describe('getPosts', () => {
    it('should retrieve all posts and return 200', async () => {
      const mockPosts = [
        { id: 1, title: 'My First Post', content: 'This is the content of my first post.', userID: 1 }
      ];
      (Post.findAll as jest.Mock).mockResolvedValue(mockPosts);

      await getPosts(req as Request, res as Response);

      expect(Post.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPosts);
    });
  });

  describe('getPostById', () => {

    it('should return 404 if post not found', async () => {
      (Post.findByPk as jest.Mock).mockResolvedValue(null);

      req.params = { postId: '1' };

      await getPostById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Post not found' });
    });
  });



});
