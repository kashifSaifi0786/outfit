import { ProductStyle } from "@/styles/ProductStyle";
import Link from "next/link";

export default function Product({ product }) {
  return (
    <ProductStyle>
      <Link href={`product/${product._id}`}>
        <div>
          <img src={product.img} alt="" />
        </div>
      </Link>
      <h2>{product.title}</h2>
      <h3>{product.price}</h3>
    </ProductStyle>
  );
}
