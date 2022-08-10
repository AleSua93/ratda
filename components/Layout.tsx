import Head from "next/head";
import Image from "next/image";
import background from "../public/background.jpg";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>RATDA</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col h-full justify-between">{children}</div>
    </>
  );
}
