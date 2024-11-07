// src/models/index.ts

import User from './User';
import Post from './Post';
import Category from './Category';
import Comment from './Comment';

// User-Post Relationship
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

// Post-Category Relationship (Many-to-Many)
Post.belongsToMany(Category, { through: 'PostCategories', foreignKey: 'postId' });
Category.belongsToMany(Post, { through: 'PostCategories', foreignKey: 'categoryId' });

// Post-Comment Relationship
Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

// Comment-User Relationship
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

export { User, Post, Category, Comment };
