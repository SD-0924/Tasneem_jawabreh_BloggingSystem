"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const User_1 = __importDefault(require("./User"));
const Post_1 = __importDefault(require("./Post"));
class Comment extends sequelize_1.Model {
}
Comment.init({
    content: sequelize_1.DataTypes.TEXT,
}, { sequelize: config_1.default, modelName: 'comment' });
Comment.belongsTo(User_1.default);
Comment.belongsTo(Post_1.default);
Post_1.default.hasMany(Comment);
User_1.default.hasMany(Comment);
exports.default = Comment;
