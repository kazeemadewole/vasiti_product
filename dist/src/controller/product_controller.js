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
class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    getAllProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allProducts = yield this.productService.getAll();
                return res.status(200).json(allProducts);
            }
            catch (error) {
                return res.status(400).send('error occured');
            }
        });
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const product = yield this.productService.getProductById(id);
                return res.status(200).json(product);
            }
            catch (error) {
                return res.status(400).send('error occured');
            }
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = req.body;
                const savedProduct = yield this.productService.getProductById(id);
                return res.status(200).json(product);
            }
            catch (error) {
                return res.status(400).send('error occured');
            }
        });
    }
}
exports.default = ProductController;
