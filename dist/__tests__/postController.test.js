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
const PostController_1 = require("../controllers/PostController");
const Post_1 = __importDefault(require("../models/Post"));
const testUtils_1 = require("./testUtils");
// Mock the Post model methods
jest.mock('../models/Post');
describe('Post Controller', () => {
    let req;
    let res;
    beforeEach(() => {
        req = (0, testUtils_1.mockRequest)();
        res = (0, testUtils_1.mockResponse)();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('createPost', () => {
        it('should create a new post and return 201', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockPost = { id: 1, title: 'My First Post', content: 'This is the content of my first post.', userID: 1 };
            Post_1.default.create.mockResolvedValue(mockPost);
            req.body = { title: 'My First Post', content: 'This is the content of my first post.', userID: 1 };
            yield (0, PostController_1.createPost)(req, res);
            expect(Post_1.default.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockPost);
        }));
    });
    describe('getPosts', () => {
        it('should retrieve all posts and return 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockPosts = [
                { id: 1, title: 'My First Post', content: 'This is the content of my first post.', userID: 1 }
            ];
            Post_1.default.findAll.mockResolvedValue(mockPosts);
            yield (0, PostController_1.getPosts)(req, res);
            expect(Post_1.default.findAll).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockPosts);
        }));
    });
    describe('getPostById', () => {
        it('should return 404 if post not found', () => __awaiter(void 0, void 0, void 0, function* () {
            Post_1.default.findByPk.mockResolvedValue(null);
            req.params = { postId: '1' };
            yield (0, PostController_1.getPostById)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Post not found' });
        }));
    });
    /*describe('updatePost', () => {
      it('should update a post and return 200', async () => {
          const mockUpdatedPost = {
            postID: 1,
            title: 'Updated Post Title',
            content: 'This is the updated content of the post.',
          };
      
          // Mock Post.update to simulate a successful update with 1 affected row
          (Post.update as jest.Mock).mockResolvedValue([1]);
          // Mock Post.findByPk to simulate fetching the updated post
          (Post.findByPk as jest.Mock).mockResolvedValue(mockUpdatedPost);
      
         req.params = { postId: '1' };
          req.body = { title: 'Updated Post Title', content: 'This is the updated content of the post.' };
      
          await updatePost(req as Request, res as Response);
      
          // Check that Post.update was called with the expected arguments
          expect(Post.update).toHaveBeenCalledWith(
            { title: 'Updated Post Title', content: 'This is the updated content of the post.' },
            { where: { postID: '1' } }
          );
  
          await updatePost(req as Request, res as Response);
          // Check that Post.findByPk was called to retrieve the updated post
          expect(Post.findByPk).toHaveBeenCalledWith('1');
      
          // Check that the response status is 200 and response JSON contains the updated post
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(mockUpdatedPost);
        });
    
  
    });*/
});
