import React, { useState } from "react";
import { useRouter } from "next/router";
import { Rate, notification } from "antd";
import Header from "../../components/Header";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
const ProductDetails = (
  id,
  title,
  price,
  description,
  category,
  image,
  rate
) => {
  const router = useRouter();
  const data = {
    title: "Very Effective Capsule",
    description:
      "Very Effective Capsule is very effective. It is used for the treatment of something that is very dangerous. It is useful very much useful and useful useful useful useful useful useful useful useful useful useful ",
    image: "https://source.unsplash.com/r8loDv_Ap2g/",
    price: "100",
    category: "capsule",
    rating: "2",
  };
  const [star, setStar] = useState(data.rating);
  console.log(rate, data.rating);
  const dispatch = useDispatch();
  const addItemToCart = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rate,
    };
    //sending product as an action to REDUX STORE cart Slice
    dispatch(addToCart(product));
    notification.success({
      placement: "bottomLeft",
      duration: 3,
      message: `Added ${data.title} to cart`,
    });
  };
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="max-w-screen-xl mx-auto p-6 mt-2 ">
        <div className="bg-white p-2 md:flex">
          <div className="">
            <img
              src={data.image}
              height="200"
              width="200"
              className="rounded-md bg-cover mx-auto"
            />
          </div>
          <div className="my-2 p-6 sm:my-4 md:my-0">
            <h2 className="font-bold text-xl md:text-3xl ">{data.title}</h2>
            <p className="my-0 p-2">
              Category: <span className="text-gray-400">{data.category}</span>
            </p>
            <p className="text-md mt-3  max-w-sm text-justify md:text-base py-4">
              {data.description}
            </p>
            <span className="my-2">
              <Rate
                allowHalf="true"
                // onChange={(e) => {
                //   setRate(e.target.value);
                // }}
                defaultValue={rate}
              />
            </span>
          </div>
          <div className="px-6 mt-0 md:mt-5 ml-auto md:space-y-10">
            <h2 className="text-bold text-2xl md:text-3xl">
              <Currency quantity={data.price} currency="NPR" />
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
