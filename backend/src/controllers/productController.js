import { AppError } from '../utils/AppError.js';
import { DiskStorage } from '../providers/DiskStorage.js';
export class ProductController {
    async update(request, response) {
        const products = request.body.products;

        return response.status(200).json(products);
    }
}
