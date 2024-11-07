"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const User_1 = __importDefault(require("./User"));
class Post extends sequelize_1.Model {
}
Post.init({
    title: sequelize_1.DataTypes.STRING,
    content: sequelize_1.DataTypes.TEXT,
}, { sequelize: config_1.default, modelName: 'post' });
Post.belongsTo(User_1.default);
User_1.default.hasMany(Post);
exports.default = Post;
