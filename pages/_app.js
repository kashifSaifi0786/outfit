import Nav from "@/components/Nav";
import "@/styles/globals.css";
import { StateContext } from "@/lib/context";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Toaster />
      <Nav />
      <Component {...pageProps} />
    </StateContext>
  );
}
