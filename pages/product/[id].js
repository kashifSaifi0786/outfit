import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Details, ProductInfo, Quantity, Buy } from "@/styles/ProductDetails";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { useStateContext } from "@/lib/context";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const route = useRouter();
  const { query } = useRouter();
  const { qty, setQty, increaseQty, decreaseQty, handleAdd } =
    useStateContext();

  useEffect(() => {
    setQty(1);
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (route.isReady) {
        await fetch(`${process.env.NEXT_PUBLIC_API}products/find/${query.id}`)
          .then((res) => res.json())
          .then((data) => {
            setProduct(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    };
    getData();
  }, [route.isReady]);

  const notify = () => {
    toast.success(`${product.title} was added to cart`, { duration: 1500 });
  };

  return (
    <Details>
      <img src={product.img} alt="" />
      <ProductInfo>
        <h3>{product.title}</h3>
        <p>{product.desc}</p>
        <Quantity>
          <span>quantity</span>
          <button>
            <AiFillMinusCircle onClick={decreaseQty} />
          </button>
          <p>{qty}</p>
          <button>
            <AiFillPlusCircle onClick={increaseQty} />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            handleAdd(product, qty);
            notify();
          }}
        >
          Add to cart
        </Buy>
      </ProductInfo>
    </Details>
  );
}
