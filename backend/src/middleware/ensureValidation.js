import { AppError } from '../utils/AppError.js';
import { DiskStorage } from '../providers/DiskStorage.js';
import csvParser from 'csv-parser';
import fs from 'fs';
import path from 'path';
import upload from '../configs/upload.js';

// Função para validar se os campos product_code e new_price foram preenchidos
function validateFields({ product_code, new_price }) {
    return product_code && new_price;
}

// Função para validar se o preço é numérico
function validatePrices(new_price) {
    //products.every(product => !isNaN(parseFloat(product.newPrice)));

    return !isNaN(parseFloat(new_price));
}

export async function ensureValidations(request, response, next) {
    const filename = request.file.filename;
    console.log(filename);
    const filepath = path.resolve(upload.TMP_FOLDER, filename);

    let data = {};

    let products = [];

    await fs
        .createReadStream(filepath)
        .pipe(csvParser())
        .on('data', ({ product_code, new_price }) => {
            const product = {
                product_code,
                new_price,
                error_log: [],
            };

            if (!validateFields({ product_code, new_price })) {
                product.error_log.push(`Campos obrigatórios ausentes para o produto.`);
            }

            if (!validatePrices(new_price)) {
                product.error_log.push(`Valor inválido para o preço do produto.`);
            }

            products = [...products, product];
        })
        .on('end', () => {
            request.file.data = products;

            next();
        });
}
