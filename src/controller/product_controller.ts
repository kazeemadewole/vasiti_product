import { IProductModel, IUpdateProductModel } from "@models/product-model";
import ProductService from "@services/product-service";
import { Request, Response } from "express";
import { productValidation } from "../validation/productValidation";
import { BaseController } from "./base_controller";

class ProductController extends BaseController{
    constructor() {
        super()
    }
    async getAllProduct(req:Request, res: Response) {
        try {
            const allProducts = await new ProductService().getAll()
            return res.status(200).json(allProducts)
        }catch(error) {
            return res.status(400).send({status: false, message: error, data: {} })
        }
    }

    async getProductById(req:Request, res: Response) {
        try{
            const id:string = req.params.id;
            const product = await new ProductService().getProductById(id);
            return res.status(200).json(product)
        }catch(error){
            return res.status(400).send({status: false, message: error, data: {} })
        }
    }

    async createProduct(req:Request, res: Response) {
        try{
            const product: IProductModel = req.body;
            
        //     const error = await this.validateRequest(product, productValidation);
        // if(error) {
        //     console.log(error);
            
        //   return res.status(422).send({status: false, message: error, data: {} });
        // }
        
            const savedProduct = await new ProductService().saveProduct(product);
            return res.status(200).json(savedProduct)
        }catch(error){
            return res.status(400).send({status: false, message: error, data: {} })
        }
    }

    async updateProduct(req:Request, res: Response) {
        try{
            const product: IUpdateProductModel = req.body;
        //     const error = await this.validateRequest(product, productValidation);
        // if(error) {
        //   return res.status(422).send({status: false, message: error, data: {} });
        // }
            const savedProduct = await new ProductService().editProduct(product)
            return res.status(200).json(savedProduct)
        }catch(error){
            return res.status(400).send({status: false, message: error, data: {} })
        }
    }
}

export default ProductController