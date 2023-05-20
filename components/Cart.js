import {
  CartWrapper,
  CartStyle,
  Cards,
  Card,
  CardInfo,
  EmptyStyle,
  Checkout,
} from "@/styles/CartStyle";
import { Quantity } from "@/styles/ProductDetails";
import { useStateContext } from "@/lib/context";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import getStripe from "@/lib/getStripe";

const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export default function Cart() {
  const { cartItems, setShowCart, handleAdd, handleRemove, totalPrice } =
    useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItems),
    });
    const data = await response.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <CartWrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowCart(false)}
    >
      <CartStyle
        initial={{ x: "50%" }}
        animate={{ x: "0%" }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        onClick={(e) => e.stopPropagation()}
      >
        {cartItems.length < 1 && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1>You have more shopping to do</h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        <Cards layout variants={cards} initial="hidden" animate="show">
          {cartItems.map((item) => (
            <Card layout variants={card} key={item._id}>
              <img src={item.img} alt="" />
              <CardInfo>
                <h3>{item.title}</h3>
                <h3>Rs. {item.price}</h3>
                <Quantity>
                  <span>Quantity</span>
                  <button>
                    <AiFillMinusCircle onClick={() => handleRemove(item)} />
                  </button>
                  <p>{item.quantity}</p>
                  <button>
                    <AiFillPlusCircle onClick={() => handleAdd(item, 1)} />
                  </button>
                </Quantity>
              </CardInfo>
            </Card>
          ))}
        </Cards>
        {cartItems.length > 0 && (
          <Checkout onClick={handleCheckout} layout>
            <h3>Subtotal: {totalPrice}</h3>
            <button>purchase</button>
          </Checkout>
        )}
      </CartStyle>
    </CartWrapper>
  );
}
