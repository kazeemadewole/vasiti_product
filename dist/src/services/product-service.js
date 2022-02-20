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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("src/repository/product"));
class ProductService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new product_1.default().getAllProduct();
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new product_1.default().getProductById(id);
        });
    }
    saveProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new product_1.default().saveProduct(product);
        });
    }
    editProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataInDb = yield this.getProductById(product.id);
            if (!dataInDb) {
                throw new Error('Product item does not exist');
            }
            return yield new product_1.default().editProduct(product.id, product);
        });
    }
}
exports.default = ProductService;
