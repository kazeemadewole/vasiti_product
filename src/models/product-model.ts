import { ObjectionModel } from "src/config/db";
import {  DefinedTableNames, SchemaName  } from '../utils/constants';


export interface IProductModel {
product_name: string;
product_description: string;
product_varieties: object;
date_uploaded: string;
date_edited: string | null
}

export interface IUpdateProductModel {
id:string;
product_name: string;
product_description: string;
product_varieties: object;
date_uploaded: string;
date_edited: string | null
}

class productModel extends ObjectionModel implements IProductModel {
    id!:string;
    product_name!: string;
    product_description!: string;
    product_varieties!: object;
    date_uploaded!: string;
    date_edited!: string | null;

   static tableName =  `${SchemaName}.${DefinedTableNames.PRODUCTS}`;
}

export default productModel