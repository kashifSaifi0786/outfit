import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import shiba from "../public/shiba.jpg";
import { motion } from "framer-motion";

const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.sessionId,
    {
      expand: ["line_items"],
    }
  );
  return {
    props: { order }, // will be passed to the page component as props
  };
}

export default function Success({ order }) {
  const router = useRouter();

  return (
    <Wrapper>
      <Card
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.75 }}
        transition={{ duration: 0.75 }}
      >
        <h1>Thank You for you Order!</h1>
        <h2>A confirmation email has been sent to</h2>
        <h2>{order.customer_details.email}</h2>
        <InfoWrapper>
          <Address>
            <h3>Address</h3>
            {Object.entries(order.customer_details.address).map(
              ([key, value]) => (
                <p key={key}>
                  {key} : {value}
                </p>
              )
            )}
          </Address>
          <div>
            <h3>Products</h3>
            {order.line_items.data.map((item) => (
              <div key={item.id}>
                <p>Product: {item.description}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.amount_total / 100}</p>
              </div>
            ))}
          </div>
        </InfoWrapper>
        <button onClick={() => router.push("/")}>Continue Shopping</button>
        <Image src={shiba} alt="shiba"></Image>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 5rem 12rem;
`;

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 2rem;
  padding: 3rem;
  button {
    color: white;
    background: var(--primary);
    padding: 1rem 2rem;
    font-size: 1.2rem;
    font-weight: 500;
    cursor: pointer;
  }
  h2 {
    margin: 1rem 0rem;
  }
  img {
    width: 70%;
    height: auto;
  }
`;

const Address = styled.div`
  width: 100%;
  font-size: 1rem;
`;
const InfoWrapper = styled.div`
  margin: 2rem 0rem;
  display: flex;
  width: 70%;
`;
