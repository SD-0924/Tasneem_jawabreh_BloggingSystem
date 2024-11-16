"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const router = (0, express_1.Router)();
router.post('/', categoryController_1.createCategory);
router.get('/', categoryController_1.getCategories);
router.get('/:categoryId', categoryController_1.getCategoryById);
router.put('/:categoryId', categoryController_1.updateCategory);
router.delete('/:categoryId', categoryController_1.deleteCategory);
exports.default = router;
