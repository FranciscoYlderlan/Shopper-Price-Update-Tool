import { Router } from 'express';
import { productRoutes } from './products.routes.js';

const routes = Router();

routes.use('/product', productRoutes);

export { routes };
