import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
// import SignIn from "../components/SignIn";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>NepPharm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="max-w-screen-xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
        {/* <SignIn /> */}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch("http://localhost:5000/api/v1/product").then(
    (res) => res.json()
  );
  return {
    props: {
      products,
    },
  };
}

// https://fakestoreapi.com/products
