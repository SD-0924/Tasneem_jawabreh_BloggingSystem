// src/models/Comment.ts

import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../config/database';
import User from './User';
import Post from './Post';

class Comment extends Model {
  public id!: number;
  public content!: string;
  public userId!: number;
  public postId!: number;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
  }
);

// Relationships
Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

export default Comment;
