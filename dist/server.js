"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use('/api/users', userRoutes_1.default);
app.use('/api/posts', postRoutes_1.default);
app.use('/api/categories', categoryRoutes_1.default);
app.use('/api/comments', commentRoutes_1.default);
/*sequelize.sync({ force: false })  // Set force: true to drop and recreate tables (use cautiously)
  .then(() => {
    console.log('Database and tables have been created.');
  })
  .catch((err) => {
    console.error('Error syncing models:', err);
  });*/
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
