import { updateProductFromDb } from '@/services/product.service';
import { cache } from "react";

const updateProduct = cache(updateProductFromDb)

export default updateProduct;