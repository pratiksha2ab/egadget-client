import Head from "next/head";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import ProductFeed from "../components/ProductFeed";
import Header from "../components/Header";
import { useEffect, useState } from "react";
export default function Home() {

  const [data,setData]=useState([])

  const getProductsList = async () => {
    
    try {
      const response = await API.get("/products/all");
      const resData = await response.data;
      console.log(data);
      setData(resData);
    
    } catch (error) {
     
    }
  };
console.log(data,'data')
  useEffect(()=>{
  getProductsList()
  },[])
  return (
    <div className="bg-gray-100">
      <Head>
        <title>HamroDeal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="max-w-screen-2xl mx-auto px-2 pb-4">
        {/* <Banner /> */}

        <ProductFeed products={data} />
      </main>
      <Footer />
    </div>
  );
}


