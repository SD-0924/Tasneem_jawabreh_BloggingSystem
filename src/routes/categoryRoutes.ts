import { Router } from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/categoryController';

const router = Router();

router.post('/', createCategory);
router.get('/', getCategories);
router.get('/:categoryId', getCategoryById);
router.put('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);

export default router;
