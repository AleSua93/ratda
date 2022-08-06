import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppAudioContextProvider from "../context/app-audio-context";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppAudioContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppAudioContextProvider>
  );
}

export default MyApp;
