import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppAudioContextProvider from "../context/app-audio-context";
import Layout from "../components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppAudioContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppAudioContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
