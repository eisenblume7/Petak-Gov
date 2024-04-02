import express from "express";
import {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/ProductController.js"

const router = express.Router();

router.get('/projects', getProduct);
router.get('/projects/:id', getProductById);
router.post('/projects', createProduct);
router.patch('/projects/:id', updateProduct);
router.delete('/projects/:id', deleteProduct);



export default router;