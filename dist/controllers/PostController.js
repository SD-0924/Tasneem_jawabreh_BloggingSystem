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
const Post_1 = __importDefault(require("../models/Post"));
const Category_1 = __importDefault(require("../models/Category"));
const Comment_1 = __importDefault(require("../models/Comment"));
exports.default = {
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield Post_1.default.create(req.body);
            res.status(201).json(post);
        });
    },
    getAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield Post_1.default.findAll({ include: [Category_1.default, Comment_1.default] });
            res.json(posts);
        });
    },
    // Other CRUD functions
};
