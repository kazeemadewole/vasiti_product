import  {Knex}  from "knex";
import { DefinedTableNames, SchemaName } from "src/utils/constants";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.withSchema(SchemaName).createTable(DefinedTableNames.PRODUCTS, (table)=> {
        table.uuid('id').primary();
        table.string('product_name').notNullable();
        table.string('product_description');
        table.jsonb('product_varieties');
        table.timestamp('date_uploaded').defaultTo(knex.fn.now());
        table.timestamp('date_edited').nullable().defaultTo(null);
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.withSchema(SchemaName).dropTable(DefinedTableNames.PRODUCTS)
}

