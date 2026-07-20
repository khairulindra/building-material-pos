import { Router } from 'express';
import * as productController from './product.controller.js';
import { createProductRules, updateProductRules } from './product.validation.js';
import { validate } from '../../middlewares/validate.js';
import { protect, roleGuard} from '../../middlewares/authGuard.js';


const router = Router();


router.get('/barcode/:barcode', protect, productController.getByBarcode);

router.get('/', protect, productController.getAll);
router.get('/:id', protect, productController.getById);

router.post('/', protect, roleGuard('admin', 'owner'), createProductRules, validate, productController.create);
router.put('/:id', protect, roleGuard('admin', 'owner'), updateProductRules, validate, productController.update);
router.delete('/:id', protect, roleGuard('admin', 'owner'), productController.remove);


export default router;