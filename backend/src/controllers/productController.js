import { AppError } from '../utils/AppError.js';
import { DiskStorage } from '../providers/DiskStorage.js';
import { ProductService } from '../services/productService.js';
import { ProductRepository } from '../repositories/productRepository.js';
export class ProductController {
    async update(request, response) {
        const { filename, data } = request.file;

        const productRepository = new ProductRepository();

        const producService = new ProductService(productRepository);

        const products = await producService.update(data);

        const diskStorage = new DiskStorage();
        diskStorage.deleteFile(filename);

        return response.status(200).json({ products });
    }
}
