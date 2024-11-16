"use strict";
// src/models/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.Category = exports.Post = exports.User = void 0;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Post_1 = __importDefault(require("./Post"));
exports.Post = Post_1.default;
const Category_1 = __importDefault(require("./Category"));
exports.Category = Category_1.default;
const Comment_1 = __importDefault(require("./Comment"));
exports.Comment = Comment_1.default;
// User-Post Relationship
User_1.default.hasMany(Post_1.default, { foreignKey: 'userId' });
Post_1.default.belongsTo(User_1.default, { foreignKey: 'userId' });
// Post-Category Relationship (Many-to-Many)
Post_1.default.belongsToMany(Category_1.default, { through: 'PostCategories', foreignKey: 'postId' });
Category_1.default.belongsToMany(Post_1.default, { through: 'PostCategories', foreignKey: 'categoryId' });
// Post-Comment Relationship
Post_1.default.hasMany(Comment_1.default, { foreignKey: 'postId' });
Comment_1.default.belongsTo(Post_1.default, { foreignKey: 'postId' });
// Comment-User Relationship
User_1.default.hasMany(Comment_1.default, { foreignKey: 'userId' });
Comment_1.default.belongsTo(User_1.default, { foreignKey: 'userId' });
