export async function up(knex) {
    return knex.schema
        .createTable('packs', table => {
            table.increments('id').notNullable().primary();
            table.bigint('product_id').notNullable().references('code').inTable('products');
            table.bigint('pack_id').notNullable().references('code').inTable('products');
            table.bigint('qty').notNullable();
        })
        .then(() => {
            return knex('packs').insert([
                { pack_id: 1000, product_id: 18, qty: 6 },
                { pack_id: 1010, product_id: 24, qty: 1 },
                { pack_id: 1010, product_id: 26, qty: 1 },
                { pack_id: 1020, product_id: 19, qty: 3 },
                { pack_id: 1020, product_id: 21, qty: 3 },
            ]);
        });
}

export async function down(knex) {
    return knex.schema.dropTable('packs');
}
