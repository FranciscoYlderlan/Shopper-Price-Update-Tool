import { Router } from 'express';
import { ProductController } from '../controllers/productController.js';
const productRoutes = Router();
const productController = new ProductController();

productRoutes.patch('/', productController.update);

export { productRoutes };
