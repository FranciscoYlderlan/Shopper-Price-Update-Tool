export class ProductService {
    constructor(repository) {
        this.repository = repository;
    }

    #validateProductCodes({ existingCodesProducts, existingCodesPacks, product }) {
        let isValid = true;
        //Regra: produto deve existir no banco
        if (!existingCodesProducts.has(parseInt(product.product_code))) {
            product.error_log.push('O código do produto não foi encontrado.');
            isValid = false;
        }

        //Regra: produto deve ser "produto componente" de um "pack" ou ser um "pack"
        if (!existingCodesPacks.has(parseInt(product.product_code))) {
            // this.violatedRulePacksCode.push(product.product_code);
            product.error_log.push(
                'Produtos que não são/(ou compõem) pacotes não devem ser atualizados'
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

    #validateRuleAllComponentsPack({ components, existingProductsCodeInFile, product }) {
        //Regra: Componentes que compõem um pacote, adicionado no arquivo de precificação
        //para atualização, devem estar contidos no arquivos de precificação.
        const missingComponents = components.map(code => {
            if (!existingProductsCodeInFile.has(code)) {
                return code;
            }
        });
        const hasMissingComponents = missingComponents.length > 0;
        if (hasMissingComponents) {
        } else {
        }
    }

    async update(products) {
        const allProducts = await this.repository.findAllProducts();
        const allPacks = await this.repository.findAllProductsToUpdate();

        const allProductsFile = products.map(row => row.product_code);
        const allCodesProducts = allProducts.map(row => row.code);
        const allCodesPacks = allPacks.map(row => row.code);

        const existingProductsCodeInFile = new Set(allProductsFile);
        const existingCodesProducts = new Set(allCodesProducts);
        const existingCodesPacks = new Set(allCodesPacks);

        products.map(async product => {
            const { product_code, new_price } = product;
            let isValid = true;
            const newPrice = parseFloat(new_price);

            const [productFound] = allProducts.filter(prod => prod.code == product_code);

            isValid = this.#validateProductCodes({
                existingCodesProducts,
                existingCodesPacks,
                product,
            });
            if (!isValid) {
                return;
            }
            if (productFound) {
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

                // const isTypePack = await this.repository.isPack(product_code);

                // if (isTypePack) {
                //     const components = await this.repository.findAllComponentsByPack(product_code);
                //     this.#validateRuleAllComponentsPack({
                //         components,
                //         existingProductsCodeInFile,
                //         product_code,
                //     });
                // }
            }
        });

        return products;
    }
}
