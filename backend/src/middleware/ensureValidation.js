import { AppError } from '../utils/AppError.js';
import { DiskStorage } from '../providers/DiskStorage.js';
import csvParser from 'csv-parser';
import fs from 'fs';
import path from 'path';
import upload from '../configs/upload.js';

export async function ensureValidations(request, response, next) {
    const filename = request.file.filename;

    const filepath = path.resolve(upload.TMP_FOLDER, filename);

    const products = [];
    const missingFields = [];
    const invalidProductCodes = [];
    const violatedRules = [];

    await fs
        .createReadStream(filepath)
        .pipe(csvParser())
        .on('data', ({ product_code, new_price }) => {
            const product = {
                product_code,
                new_price,
            };
            const invalidFields = !product_code || !new_price;

            if (invalidFields) {
                missingFields.push(product_code);
            }

            products = [...products, product];
        })
        .on('end', () => {
            console.log(products);
        });

    next();
}
