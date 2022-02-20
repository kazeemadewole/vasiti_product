"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
exports.productValidation = joi_1.default.object({
    product_name: joi_1.default.string().required(),
    product_description: joi_1.default.string(),
    product_varieties: joi_1.default.object()
});
