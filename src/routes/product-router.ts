import StatusCodes from 'http-status-codes';
import { Router } from 'express'
import ProductController from '../controller/product_controller';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;
const productController = new ProductController()

// Paths
export const p = {
    get: '/all',
    add: '/add',
    update: '/update',
    getOne: '/:id',
} as const;



/**
 * Get all users.
 */
router.get(p.get,productController.getAllProduct );


/**
 * Add one user.
 */
router.post(p.add, productController.createProduct);


/**
 * Update one user.
 */
router.put(p.update, productController.updateProduct);


/**
 * get one user.
 */
router.get(p.getOne, productController.getProductById);


// Export default
export default router;
