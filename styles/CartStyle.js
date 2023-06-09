import styled from "styled-components";
//Animation
const { motion } = require("framer-motion");

export const CartWrapper = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  justify-content: flex-end;
`;

export const CartStyle = styled(motion.div)`
  width: 30%;
  background: #f1f1f1;
  padding: 2rem 2rem;
  overflow-y: scroll;
  position: relative;

  @media (max-width: 1024px) {
    width: 45%;
  }
  @media (max-width: 768px) {
    width: 60%;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const Card = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 2rem;
  margin: 2rem 0rem;
  border-radius: 1rem;
  background: white;
  overflow: hidden;
  img {
    width: 8rem;
    height: 6rem;
  }
`;

export const CardInfo = styled(motion.div)`
  width: 50%;
  div {
    display: flex;
    justify-content: space-between;
  }
`;

export const EmptyStyle = styled(motion.div)`
  position: absolute;
  top: 20%;
  transform: translate(-45%, 0%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  height: 80%;
  h1 {
    font-size: 2rem;
    padding: 2rem 0rem;
  }
  svg {
    font-size: 10rem;
    color: var(--secondary);
  }
`;

export const Checkout = styled(motion.div)`
  button {
    width: 100%;
    background: var(--primary);
    color: white;
    padding: 1rem 2rem;
    margin-top: 2rem;
    cursor: pointer;
  }
  button:disabled {
    background: var(--secondary);
    cursor: not-allowed;
  }
`;

export const Cancle = styled.div`
  text-align: end;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1;
  @media (min-width: 480px) {
    display: none;
  }
`;

export const Cards = styled(motion.div)``;
