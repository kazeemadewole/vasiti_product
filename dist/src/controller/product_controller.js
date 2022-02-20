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
const product_service_1 = __importDefault(require("@services/product-service"));
const productValidation_1 = require("../validation/productValidation");
const base_controller_1 = require("./base_controller");
class ProductController extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    getAllProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allProducts = yield new product_service_1.default().getAll();
                return res.status(200).json(allProducts);
            }
            catch (error) {
                return res.status(400).send({ status: false, message: error, data: {} });
            }
        });
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const product = yield new product_service_1.default().getProductById(id);
                return res.status(200).json(product);
            }
            catch (error) {
                return res.status(400).send({ status: false, message: error, data: {} });
            }
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = req.body;
                const error = yield this.validateRequest(product, productValidation_1.productValidation);
                if (error) {
                    return res.status(422).send({ status: false, message: error, data: {} });
                }
                const savedProduct = yield new product_service_1.default().saveProduct(product);
                return res.status(200).json(product);
            }
            catch (error) {
                return res.status(400).send({ status: false, message: error, data: {} });
            }
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = req.body;
                const error = yield this.validateRequest(product, productValidation_1.productValidation);
                if (error) {
                    return res.status(422).send({ status: false, message: error, data: {} });
                }
                const savedProduct = yield new product_service_1.default().editProduct(product);
                return res.status(200).json(product);
            }
            catch (error) {
                return res.status(400).send({ status: false, message: error, data: {} });
            }
        });
    }
}
exports.default = ProductController;
