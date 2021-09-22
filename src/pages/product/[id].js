import React, { useState } from "react";
import { Rate, notification } from "antd";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import Header from "../../components/Header";
const ProductDetails = ({ item }) => {
  console.log({ item });
  const dispatch = useDispatch();
  const addItemToCart = () => {
    const product = {
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.image,
      requirePrescription: item.requirePrescription,
    };
    //sending product as an action to REDUX STORE cart Slice
    dispatch(addToCart(product));
    notification.success({
      placement: "bottomLeft",
      duration: 3,
      message: `Added ${product.title} to cart`,
    });
  };
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="max-w-screen-xl mx-auto p-6 mt-2 ">
        <div className="bg-white p-2 md:flex">
          <div className="">
            <img
              src={item.image}
              height="200"
              width="200"
              className="rounded-md bg-cover mx-auto"
            />
          </div>
          <div className="my-2 p-6 sm:my-4 md:my-0">
            <h2 className="font-bold text-xl md:text-3xl ">{item.title}</h2>
            <p className="my-0 p-2">
              Category: <span className="text-gray-400">{item.category}</span>
            </p>
            <p className="text-md mt-3  max-w-sm text-justify md:text-base py-4">
              {item.description}
            </p>
            <span className="my-2">
              <Rate
                allowHalf="true"
                // onChange={(e) => {
                //   setRate(e.target.value);
                // }}
                defaultValue={3}
              />
            </span>
            {item.requirePrescription && (
              <p className="py-4 font-semibold tracking-wide text-gray-600 underline">
                This product requires a valid Prescription before purchasing.
              </p>
            )}
          </div>
          <div className="px-6 mt-0 md:mt-5 ml-auto md:space-y-10">
            <h2 className="text-bold text-2xl md:text-3xl">
              <Currency quantity={Number(item.price)} currency="NPR" />
            </h2>
            <button className="button w-40" onClick={addItemToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;

// export const getStaticPaths = async () => {
//   const products = await fetch("http://localhost:5000/product").then((res) =>
//     res.json()
//   );
//   const paths = products.map((product) => {
//     return {
//       params: { id: product.id.toString() },
//     };
//   });
//   return {
//     paths: paths,
//     fallback: false,
//   };
// };

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const res = await fetch("http://localhost:5000/product/" + id);
  const data = await res.json();

  return {
    props: { item: data },
  };
};
