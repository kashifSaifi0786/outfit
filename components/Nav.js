import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { NavStyle, NavItems } from "@/styles/NavStyle";
import { useStateContext } from "@/lib/context";
import Cart from "./Cart";

//framer motion
const { AnimatePresence, motion } = require("framer-motion");

export default function Nav() {
  const { showCart, setShowCart, totalQty } = useStateContext();

  return (
    <NavStyle>
      <Link href={"/"}>Outfit</Link>
      <NavItems>
        <div onClick={() => setShowCart(true)}>
          {totalQty > 0 && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
              {totalQty}
            </motion.span>
          )}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </NavStyle>
  );
}
