import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Product from "@/components/Product";
import { Gallery } from "@/styles/Gallery";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await fetch(`${process.env.NEXT_PUBLIC_API}products`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((err) => console.log(err.message));
      setLoading(false);
    };
    getData();
  }, []);

  if (loading)
    return (
      <h1 style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</h1>
    );

  return (
    <>
      <Head>
        <title>Outfit Delight</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Gallery>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </Gallery>
      </main>
    </>
  );
}
