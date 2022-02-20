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
exports.down = exports.up = void 0;
const constants_1 = require("../utils/constants");
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.raw(`CREATE SCHEMA IF NOT EXISTS ${constants_1.SchemaName};`);
        return yield knex.schema.withSchema(constants_1.SchemaName).createTable(constants_1.DefinedTableNames.PRODUCTS, (table) => {
            table.uuid('id').primary();
            table.string('product_name').notNullable();
            table.string('product_description');
            table.jsonb('product_varieties');
            table.timestamp('date_uploaded').defaultTo(knex.fn.now());
            table.timestamp('date_edited').nullable().defaultTo(null);
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield knex.schema.withSchema(constants_1.SchemaName).dropTable(constants_1.DefinedTableNames.PRODUCTS);
    });
}
exports.down = down;
