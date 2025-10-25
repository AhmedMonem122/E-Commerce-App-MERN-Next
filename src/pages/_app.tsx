import type { AppProps } from "next/app";
import TanstackQueryContextProvider from "@/context/TanstackQueryContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TanstackQueryContextProvider>
      <Component {...pageProps} />
    </TanstackQueryContextProvider>
  );
}

export default MyApp;
