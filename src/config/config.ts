import { Sequelize, DataTypes } from "sequelize";

// Initialize Sequelize instance
const sequelize = new Sequelize('blogging_system', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
});

export default sequelize;

// User Model
export const User = sequelize.define(
  "user",
  {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    tableName: "user",
    timestamps: true,
  }
);

// Post Model
export const Post = sequelize.define(
  "post",
  {
    postID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    tableName: "post",
    timestamps: true,
  }
);

// Category Model
export const Category = sequelize.define(
  "category",
  {
    categoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "category",
    timestamps: false,
  }
);

// Comment Model
export const Comment = sequelize.define(
  "comment",
  {
    commentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "comment",
    timestamps: true,
  }
);

// User-Post Relationship (One-to-Many)
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

// Post-Category Relationship (Many-to-Many)
Post.belongsToMany(Category, { through: 'PostCategories', foreignKey: 'postId' });
Category.belongsToMany(Post, { through: 'PostCategories', foreignKey: 'categoryId' });

// Post-Comment Relationship (One-to-Many)
Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

// User-Comment Relationship (One-to-Many)
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

