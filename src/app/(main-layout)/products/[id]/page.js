import ProductInfo from "@/components/ProductInfo";
import getSingleProduct from "@/utils/getSingleProduct";

export const revalidate = 0;

const ProductDetails = async ({ params: { id } }) => {
  const product = await getSingleProduct(id);

  return (
    <div>
      <ProductInfo product={product}></ProductInfo>
    </div>
  );
};

export default ProductDetails;