"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
class Category extends sequelize_1.Model {
}
Category.init({
    name: sequelize_1.DataTypes.STRING,
}, { sequelize: config_1.default, modelName: 'category' });
exports.default = Category;
