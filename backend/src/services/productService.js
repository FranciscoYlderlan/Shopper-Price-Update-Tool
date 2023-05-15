export class ProductService {
    constructor(repository) {
        this.repository = repository;
    }

    #validateProductCodes({ existingProductsCode, existingProductsAndComponentsCodes, product }) {
        let isValid = true;
        //Regra: produto deve existir no banco
        if (!existingProductsCode.has(parseInt(product.product_code))) {
            product.error_log.push('O código do produto não foi encontrado.');
            isValid = false;
        }

        //Regra: produto deve ser "produto componente" de um "pack" ou ser um "pack"
        if (!existingProductsAndComponentsCodes.has(parseInt(product.product_code))) {
            // this.violatedRulePacksCode.push(product.product_code);
            product.error_log.push(
                'Produtos que não são/compõem pacotes não podem ser atualizados.'
            );
            isValid = false;
        }
        return isValid;
    }

    #validatePriceMoreThanCost({ newPrice, cost_price, product }) {
        // Regra: Preço não pode ficar abaixo do custo
        const isPriceLessThanCost = newPrice < parseFloat(cost_price);
        if (isPriceLessThanCost) {
            product.error_log.push('O produto possui preço inferior ao custo.');
        }
    }

    #validatePriceMaxAllowedDifference({ newPrice, sales_price, product }) {
        // Regra: Reajuste deve ser no máximo +/- 10% do preço atual
        const currentPrice = parseFloat(sales_price);

        const priceDifference = Math.abs(currentPrice - newPrice);
        const maxAllowedDifference = currentPrice * 0.1;
        const isInvalidDifference = priceDifference > maxAllowedDifference;

        if (isInvalidDifference) {
            product.error_log.push('O reajuste do produto é superior a +/- 10% do preço atual.');
        }
    }

    async #validateComponentHasPackInFile({ product, allProductsFile, existingPacksCode }) {
        if (existingPacksCode.has(parseInt(product.product_code))) {
            return true;
        }

        const packs = await this.repository.findPackByComponent(product.product_code);
        const matchingPack = packs.some(({ pack_id }) => allProductsFile.includes(pack_id));

        if (!matchingPack) {
            product.error_log.push('O pacote no qual pertence esse componente não foi listado.');
        }

        return matchingPack;
    }

    #validateAllComponentsPackInFile({ components, existingProductsCodeInFile, product }) {
        //Regra: Componentes que compõem um pacote, devem estar contidos no arquivos de precificação.
        const missingComponents = components.filter(({ product_id }) => {
            if (!existingProductsCodeInFile.has(product_id)) {
                return product_id;
            }
        });
        const hasMissingComponents = missingComponents.length > 0;

        if (hasMissingComponents) {
            product.error_log.push(
                `Os seguintes códigos de produtos que compõem o pacote não foram informados: ${missingComponents.join(
                    ', '
                )}`
            );
        }
    }

    #validateSumAllComponentsPack({ components, products, product }) {
        //Regra: A soma  dos componentes que compõem um pacote,
        //deve ser igual ao novo preço do pacote.
        let componentsIds = [];
        const componentsWithQty = components.map(({ product_id, qty }) => {
            const [component] = products.filter(product => product.product_code == product_id);
            componentsIds = [...componentsIds, product_id];

            return {
                ...component,
                qty,
            };
        });

        const sumALlComponentsPricesIntoPack = componentsWithQty.reduce(
            (accumulator, component) => {
                return accumulator + component.new_price * component.qty;
            },
            0
        );

        if (sumALlComponentsPricesIntoPack != product.new_price) {
            components.map(({ product_id }) => {
                const [componentWithLog] = products.filter(
                    product => product.product_code == product_id
                );
                componentWithLog.error_log.push(
                    `O novo preço do pacote ${product.product_code} ao qual este componente pertence não condiz com a soma total dos componentes.`
                );
            });
            product.error_log.push(
                `Os soma dos produtos que compõem o pacote: (${componentsIds.join(
                    ', '
                )}) deve ser igual ao valor do pacote: ${product.product_code}.`
            );
        }
    }

    async update(products) {
        const allProducts = await this.repository.findAllProducts();
        const allPacks = await this.repository.findAllPacks();
        const allProductsAndComponentes = await this.repository.findAllProductsToUpdate();

        const allProductsFile = products.map(row => parseInt(row.product_code));
        const allProductsCode = allProducts.map(row => row.code);
        const allPacksCode = allPacks.map(row => row.pack_id);
        const allProductsAndComponentsCodes = allProductsAndComponentes.map(row => row.code);

        const existingProductsCodeInFile = new Set(allProductsFile);
        const existingProductsCode = new Set(allProductsCode);
        const existingPacksCode = new Set(allPacksCode);
        const existingProductsAndComponentsCodes = new Set(allProductsAndComponentsCodes);

        await Promise.all(
            products.map(async product => {
                const { product_code, new_price } = product;
                let isValid = true;
                const newPrice = parseFloat(new_price);

                const [productFound] = allProducts.filter(prod => prod.code == product_code);

                isValid = this.#validateProductCodes({
                    existingProductsCode,
                    existingProductsAndComponentsCodes,
                    product,
                });
                if (!isValid) {
                    return;
                }
                if (productFound) {
                    isValid = await this.#validateComponentHasPackInFile({
                        product,
                        existingPacksCode,
                        allProductsFile,
                    });

                    if (!isValid) {
                        return;
                    }

                    this.#validatePriceMoreThanCost({
                        newPrice,
                        cost_price: productFound.cost_price,
                        product,
                    });
                    this.#validatePriceMaxAllowedDifference({
                        newPrice,
                        sales_price: productFound.sales_price,
                        product,
                    });

                    const isTypePack = await this.repository.isPack(product_code);

                    if (isTypePack) {
                        const components = await this.repository.findAllComponentsByPack(
                            product_code
                        );

                        this.#validateAllComponentsPackInFile({
                            components,
                            existingProductsCodeInFile,
                            product,
                        });
                        this.#validateSumAllComponentsPack({ components, products, product });
                    }
                }
            })
        );

        return products;
    }
}
