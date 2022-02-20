"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("src/config/db");
const constants_1 = require("../utils/constants");
class productModel extends db_1.ObjectionModel {
}
productModel.tableName = `${constants_1.SchemaName}.${constants_1.DefinedTableNames.PRODUCTS}`;
exports.default = productModel;
