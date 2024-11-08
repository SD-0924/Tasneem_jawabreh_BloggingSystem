import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';  // Import your sequelize instance
import User from './User';  // Ensure you're importing the User model correctly

// Define the interface for the Post model
interface PostAttributes {
  postID: number;
  title: string;
  content: string;
  userID: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the interface for creating a post (optional properties for creation)
interface PostCreationAttributes extends Optional<PostAttributes, 'postID'> {}

// Create the Post model
class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public postID!: number;
  public title!: string;
  public content!: string;
  public userID!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Initialize the model
Post.init(
  {
    postID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,  // Sequelize instance
    modelName: 'Post',
    tableName: 'post',
    timestamps: true,  // Automatically manage createdAt and updatedAt
  }
);

// Relationship: Post belongs to User
Post.belongsTo(User, { foreignKey: 'userID', as: 'user' });

export default Post;
