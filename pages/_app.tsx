import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import DebugContextProvider from "../context/debug-context";
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <DebugContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DebugContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
