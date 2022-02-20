"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.p = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controller/product_controller"));
// Constants
const router = (0, express_1.Router)();
const { CREATED, OK } = http_status_codes_1.default;
const productController = new product_controller_1.default();
// Paths
exports.p = {
    get: '/all',
    add: '/add',
    update: '/update',
    getOne: '/:id',
};
/**
 * Get all users.
 */
router.get(exports.p.get, productController.getAllProduct);
/**
 * Add one user.
 */
router.post(exports.p.add, productController.createProduct);
/**
 * Update one user.
 */
router.put(exports.p.update, productController.updateProduct);
/**
 * get one user.
 */
router.get(exports.p.getOne, productController.getProductById);
// Export default
exports.default = router;
