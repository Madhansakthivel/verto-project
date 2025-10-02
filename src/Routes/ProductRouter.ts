import { Router } from 'express';
import { addProduct, getAllProducts, getProductBelowThreshold, 
  updateProduct, increaseStockQuantity, decreaseStockQuantity, deleteProduct}
  from '../Controllers/stockProductController';

 const Route = Router();

Route.post('/', addProduct);

Route.get('/',getAllProducts);

Route.get('/threshold/:value', getProductBelowThreshold);

Route.patch('/:id', updateProduct);

Route.patch('/:id/increase-quantity', increaseStockQuantity);

Route.patch('/:id/decrease-quantity', decreaseStockQuantity);

Route.delete('/:id', deleteProduct);

export default Route;