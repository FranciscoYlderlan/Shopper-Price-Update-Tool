import { AppError } from '../utils/AppError.js';
import { DiskStorage } from '../providers/DiskStorage.js';
export class ProductController {
    async update(request, response) {
        const { filename, data } = request.file;

        return response.status(200).json({ filename, data });
    }
}
