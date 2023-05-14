import { Router } from 'express';
import { productRoutes } from './products.routes.js';
import uploadConfigs from '../configs/upload.js';
import multer from 'multer';

const routes = Router();

const upload = multer(uploadConfigs.MULTER);

routes.use('/product', upload.single('pricingFile'), productRoutes);

export { routes };
