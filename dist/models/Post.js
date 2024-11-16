"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database")); // Import your sequelize instance
const User_1 = __importDefault(require("./User")); // Ensure you're importing the User model correctly
// Create the Post model
class Post extends sequelize_1.Model {
}
// Initialize the model
Post.init({
    postID: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    userID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database_1.default, // Sequelize instance
    modelName: 'Post',
    tableName: 'post',
    timestamps: true, // Automatically manage createdAt and updatedAt
});
// Relationship: Post belongs to User
Post.belongsTo(User_1.default, { foreignKey: 'userID', as: 'user' });
exports.default = Post;
