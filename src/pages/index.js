import Head from "next/head";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import ProductFeed from "../components/ProductFeed";
import Header from "../components/Header";
export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>NepPharm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header products={products} />
      <main className="max-w-screen-2xl mx-auto px-2 pb-4">
        <Banner />

        <ProductFeed products={products} />
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const pr = await fetch("https://fakestoreapi.com/products").then((res) =>
    res.json()
  );
  // const products = await pr.filter((prod) => {
  //   if (prod.requirePrescription) {
  //     return prod;
  //   }
  // });
  return {
    props: {
      products: pr,
    },
  };
}

// https://fakestoreapi.com/products
