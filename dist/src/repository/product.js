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
const product_model_1 = __importDefault(require("../models/product-model"));
const utilservice_1 = require("../utils/utilservice");
class ProductRepository {
    getAllProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.default.query();
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.default.query().findById(id);
        });
    }
    saveProduct(products) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataToDb = Object.assign(Object.assign({}, products), { id: utilservice_1.UtilService.getUUID() });
                const savedProduct = yield product_model_1.default.query().insertAndFetch(dataToDb);
                if (!(savedProduct === null || savedProduct === void 0 ? void 0 : savedProduct.id)) {
                    throw new Error('Error occured while saving product');
                }
                return savedProduct;
            }
            catch (error) {
                return new Error(error);
            }
        });
    }
    editProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedProduct = yield product_model_1.default.query().patchAndFetchById(id, product);
                return updatedProduct;
            }
            catch (error) {
                return new Error(error);
            }
        });
    }
}
exports.default = ProductRepository;
