import productModel, { IProductModel } from "@models/product-model";
import { UtilService } from "src/utils/utilservice";


class ProductRepository {

async getAllProduct() {
    return await productModel.query()
}

async getProductById(id:string) {
    return await productModel.query().findById(id)
}

async saveProduct(products: IProductModel) {
    try{
        const dataToDb = {
            ...products,
            id:UtilService.getUUID()
        }
    
        const savedProduct = await productModel.query().insertAndFetch(dataToDb)
        if(!savedProduct?.id) {
            throw new Error('Error occured while saving product')
        }
        return savedProduct;
    }catch(error) {
        return new Error(error)
    }   
}

async editProduct(id:string, product:IProductModel) {
    try{
       const updatedProduct = await productModel.query().patchAndFetchById(id, product);
        return updatedProduct
    }catch(error) {
        return new Error(error)
    }
}

}

export default ProductRepository;