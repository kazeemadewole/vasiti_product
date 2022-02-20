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
exports.BaseController = void 0;
class BaseController {
    validateRequest(requestBody, validationSchema) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const error = validationSchema.validate(requestBody);
            if (error === null || error === void 0 ? void 0 : error.error) {
                return Promise.resolve((_a = error.error) === null || _a === void 0 ? void 0 : _a.details[0].message);
            }
        });
    }
}
exports.BaseController = BaseController;
