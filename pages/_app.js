import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Documentation</title>
      </Head>
      <Component {...pageProps} />
      {/* </Provider> */}
    </>
  );
}

export default MyApp;
