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
      <Header />
      <main className="max-w-screen-xl mx-auto pb-4">
        <Banner />
        <div className="bg-gray-200">
          <p className="text-md sm:text-lg md:text-3xl font-bold text-gray-700 px-8 py-2">
            Recently added products
          </p>
        </div>
        <ProductFeed products={products} />
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const pr = await fetch("http://localhost:5000/product").then((res) =>
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
