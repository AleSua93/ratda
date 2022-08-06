import Head from "next/head";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>RATDA</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="grid h-full w-full grid-cols-4 grid-rows-4 border-2 border-gray-900 p-4">
        {children}
      </div>
    </>
  );
}
