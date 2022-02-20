"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.getAllProduct();
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.getProductById(id);
        });
    }
    saveProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.saveProduct(product);
        });
    }
    editProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataInDb = yield this.getProductById(id);
            if (!dataInDb) {
                throw new Error('Product item does not exist');
            }
            return yield this.productRepository.editProduct(id, product);
        });
    }
}
exports.default = ProductService;
