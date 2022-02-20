import { IProductModel, IUpdateProductModel } from "@models/product-model"
import ProductRepository from "src/repository/product"

class ProductService {
    
    async getAll() {
        return await new ProductRepository().getAllProduct()
    }

    async getProductById(id:string) {
        return await new ProductRepository().getProductById(id)
    }

    async saveProduct(product: IProductModel) {
        return await new ProductRepository().saveProduct(product)
    }

    async editProduct( product: IUpdateProductModel) {
        const dataInDb = await this.getProductById(product.id);
        if(!dataInDb) {
            throw new Error('Product item does not exist')
        }
        return await new ProductRepository().editProduct(product.id, product)

    }
}

export default ProductService