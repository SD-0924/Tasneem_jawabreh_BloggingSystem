import express from 'express';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import categoryRoutes from './routes/categoryRoutes';
import commentRoutes from './routes/commentRoutes';
import User from './models/User';
import Post from './models/Post';
import Category from './models/Category';
import Comment from './models/Comment';
import sequelize from './config/config';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes);

sequelize.sync({ force: false })  // Set force: true to drop and recreate tables (use cautiously)
  .then(() => {
    console.log('Database and tables have been created.');
  })
  .catch((err) => {
    console.error('Error syncing models:', err);
  });