// src/config/database.ts

import { Sequelize } from 'sequelize';

// Initialize Sequelize instance
const sequelize = new Sequelize('blogging_system', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log,
  });
  
  export default sequelize;
