import express from 'express';
import {
    addCategory,
    getAllCategories,
    getCategoryDetails,
    updateCategory,
    deleteCategory
} from '../controllers/categoryController.js';

const router = express.Router();

router.post('/addcategory', addCategory);
router.get('/getALlCategories', getAllCategories);
router.get('/getCategorydetails/:id', getCategoryDetails);
router.put('/updatecategory/:id', updateCategory);
router.delete('/deletecategory/:id', deleteCategory);

export default router;
