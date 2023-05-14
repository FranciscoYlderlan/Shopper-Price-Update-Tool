import uploadsConfig from './../configs/upload.js';
import path from 'path';
import fs from 'fs';

export class DiskStorage {

    async saveFile(filename) {}
    async deleteFile(filename) {
        filepath = path.resolve(uploadsConfig.TMP_FOLDER, filename);
        try {
            await fs.promises.stat(filepath);
        } catch (error) {
            console.log('Falha ao procurar arquivo: ', error);
        }
        await fs.promises.unlink(filepath);
    }
}
