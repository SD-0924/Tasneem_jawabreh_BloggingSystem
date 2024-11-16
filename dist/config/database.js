"use strict";
// src/config/database.ts
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Initialize Sequelize instance
const sequelize = new sequelize_1.Sequelize('blogging_system', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log,
});
exports.default = sequelize;
