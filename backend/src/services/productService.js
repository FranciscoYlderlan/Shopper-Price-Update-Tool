export class ProductService {
    //códigos dos produtos que não são ou não compõem pacotes.
    violatedRulePacksCode = [];
    //códigos dos produtos que não existem na tabela de produtos.
    violatedRuleProductCodes = [];
    //códigos dos produtos que não existem na tabela de produtos.
    violatedRuleProductCodes = [];
    //códigos dos packs que não informaram todos seus componentes.
    violatedRuleComponentsPack = [];
    //código dos produtos com preço abaixo do custo.
    violatedRulePriceMoreThanCost = [];
    //código dos produtos com reajuste superior a +/- 10% do preço atual
    violatedRulePriceMaxAllowedDifference = [];

    constructor(repository) {
        this.repository = repository;
    }

    async update(data) {
        const { products, invalidProducts } = data;

        const allProducts = await this.repository.findAll();
        const allPacks = await this.repository.findAllProductsToUpdate();

        const allProductsFile = products.map(row => row.code);
        const allCodesProducts = allProducts.map(row => row.code);
        const allCodesPacks = allPacks.map(row => row.code);

        const existingCodesProductsFile = new Set(allProductsFile);
        const existingCodesProducts = new Set(allCodesProducts);
        const existingCodesPacks = new Set(allCodesPacks);

        products.map(async product => {
            const { product_code, new_price } = product;

            const newPrice = parseFloat(new_price);

            const productFound = allProducts.filter(prod => prod.code == product_code);

            //Regra: produto deve existir no banco
            if (!existingCodesProducts.has(product_code)) {
                this.violatedRuleProductCodes.push(product_code);
            }

            //Regra: produto deve ser "produto componente" de um "pack" ou ser um "pack"
            if (!existingCodesPacks.has(product_code)) {
                this.violatedRulePacksCode.push(product_code);
            }

            // Regra: Preço não pode ficar abaixo do custo
            const isPriceLessThanCost = newPrice < parseFloat(productFound.cost_price);
            if (isPriceLessThanCost) {
                this.violatedRulePriceMoreThanCost.push(product_code);
            }

            // Regra: Reajuste deve ser no máximo +/- 10% do preço atual
            const currentPrice = parseFloat(productFound.sales_price);

            const priceDifference = Math.abs(currentPrice - newPrice);
            const maxAllowedDifference = currentPrice * 0.1;
            const isInvalidDifference = priceDifference > maxAllowedDifference;
            if (isInvalidDifference) {
                this.violatedRulePriceMaxAllowedDifference.push(product_code);
            }

            const isTypePack = await this.repository.isPack(product_code);

            if (isTypePack) {
                // Regra: Componentes que compõem um pacote adicionado para atualização devem
                //estar contidos no arquivos de precificação
                const components = await this.repository.findAllComponentsByPack(product_code);
                const missingComponents = components.map(row => {
                    if (!existingCodesProductsFile.has(row.code)) {
                        return row.code;
                    }
                });
                const hasMissingComponents = missingComponents.length > 0;
                if (hasMissingComponents) {
                    this.violatedRuleComponentsPack.push(product_code);
                }
            }
        });
    }
}
