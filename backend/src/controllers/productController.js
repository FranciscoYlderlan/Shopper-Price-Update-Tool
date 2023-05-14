import { AppError } from '../utils/AppError.js';
import { DiskStorage } from '../providers/DiskStorage.js';
export class ProductController {
    async update(request, response) {
        const filename = request.file.filename;

        const diskStorage = new DiskStorage();

        await diskStorage.saveFile(filename);

        return response.status(200).json({ filename });
    }
}
