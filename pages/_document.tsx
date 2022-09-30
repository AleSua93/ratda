import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Inconsolata&display=optional"
          rel="stylesheet"
        />
      </Head>
      <body className="text-white bg-black h-full w-full font-display">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
