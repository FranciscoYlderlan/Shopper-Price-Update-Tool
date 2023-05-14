export class ProductService {
    invalidProductCodes = [];
    violatedRules = [];

    constructor(repository) {
        this.repository = repository;
    }

    // método para validar se os códigos de produtos existem no banco de dados
    #validateProductCodes() {}

    // Regra: Preço não pode ficar abaixo do custo
    #validatePriceMoreThanCost() {}

    // Regra: Reajuste deve ser no máximo +/- 10% do preço atual
    #validatePriceMaxAllowedDifference() {}

    async update(products) {}
}
