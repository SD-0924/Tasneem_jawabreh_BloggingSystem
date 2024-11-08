// src/models/Comment.ts

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Post from './Post';

// Define the attributes for the Comment model
interface CommentAttributes {
  commentID: number;
  content: string;
  userID: number;
  postID: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the attributes required to create a Comment (id is optional during creation)
interface CommentCreationAttributes extends Optional<CommentAttributes, 'commentID'> {}

// Create the Comment model
class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  public commentID!: number;
  public content!: string;
  public userID!: number;
  public postID!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Initialize the Comment model
Comment.init(
  {
    commentID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'userID',
      },
    },
    postID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Post,
        key: 'postID',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comment',
    timestamps: true,
  }
);

// Relationships
Comment.belongsTo(User, { foreignKey: 'userID', as: 'user' });
Comment.belongsTo(Post, { foreignKey: 'postID', as: 'post' });

export default Comment;
