import { Router } from 'express';
import { productRoutes } from './products.routes.js';
import uploadConfigs from '../configs/upload.js';
import multer from 'multer';
import { ensureValidations } from '../middleware/ensureValidation.js';

const routes = Router();

const upload = multer(uploadConfigs.MULTER);

routes.use('/product', upload.single('pricingFile'), ensureValidations, productRoutes);

export { routes };
