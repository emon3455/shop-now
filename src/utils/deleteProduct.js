import { deleteProductByIdFromDb } from '@/services/product.service';
import React from 'react';
import { cache } from "react";

const deleteProduct = cache(deleteProductByIdFromDb)

export default deleteProduct;