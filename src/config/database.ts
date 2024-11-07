// src/config/database.ts

import { Sequelize } from 'sequelize';

// Initialize Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',  // Your MySQL username
  password: '',      // Your MySQL password
  database: 'blogging_system',  // Your database name
});

export { sequelize };
