import knex from '../database/knex/index.js';

export class ProductsRepository {
    constructor() {
        this.Products = () => knex('products');
        this.Packs = () => knex('packs');
    }

    async findAllProducts() {
        const products = await this.Products();
        return products;
    }

    async findProductsById(id) {
        const products = await this.Products().where({ code: id }).first();
        return products;
    }

    async findAllProductsToUpdate() {
        return this.Products()
            .select('products.*')
            .innerJoin('packs', function () {
                this.on('code', 'packs.product_id').orOn('code', 'packs.pack_id');
            });
    }

    async findProductsByIdToUpdate(id) {
        const products = await this.findAllProductsToUpdate().where({ code: id }).first();
        return products;
    }
    async findAllComponentsByPack(pack_id) {
        const components = await this.Packs()
            .select('product_id')
            .where({ pack_id })
            .innerJoin('packs', 'code', 'packs.pack_id');
        return components;
    }
}
