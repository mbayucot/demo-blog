import Head from "next/head";

import Header from "./navigation/Header";

function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>Demo Blog</title>
      </Head>

      <Header />

      <main className="container mx-auto p-5">{children}</main>
    </>
  );
}

export default Layout;
