import knex from '../database/knex/index.js';
import sql from 'knex';

export class ProductRepository {
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
    async isPack(pack_id) {
        const pack = await this.Packs().where({ pack_id }).first();
        return pack;
    }

    async findAllProductsToUpdate() {
        return this.Products().innerJoin('packs', function () {
            this.on('code', 'packs.product_id').orOn('code', 'packs.pack_id');
        });
        // .distinct('code');
    }

    async findProductsByIdToUpdate(id) {
        const products = await this.findAllProductsToUpdate().where({ code: id }).first();
        return products;
    }
    async findAllComponentsByPack(pack_id) {
        const components = await this.Packs().select('product_id').where({ pack_id });
        return components;
    }

    async findAllComponentsSellingPricesByPack(pack_id) {
        const componentsSellingPrices = await this.Products()
            .select(sql.raw('qty * price_sales as SellingPrices'))
            .innerJoin('packs', function () {
                this.on('code', 'packs.product_id').andOn('product_id', pack_id);
            });
        return componentsSellingPrices;
    }
}
//seleciona todas infos dos componentes de um produto pack.
//multiplica product_sales por qty
//o resultado deverá ser igual a do pack new_price
