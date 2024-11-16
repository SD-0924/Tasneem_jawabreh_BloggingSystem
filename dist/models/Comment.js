"use strict";
// src/models/Comment.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const User_1 = __importDefault(require("./User"));
const Post_1 = __importDefault(require("./Post"));
// Create the Comment model
class Comment extends sequelize_1.Model {
}
// Initialize the Comment model
Comment.init({
    commentID: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    userID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User_1.default,
            key: 'userID',
        },
    },
    postID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Post_1.default,
            key: 'postID',
        },
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Comment',
    tableName: 'comment',
    timestamps: true,
});
// Relationships
Comment.belongsTo(User_1.default, { foreignKey: 'userID', as: 'user' });
Comment.belongsTo(Post_1.default, { foreignKey: 'postID', as: 'post' });
exports.default = Comment;
