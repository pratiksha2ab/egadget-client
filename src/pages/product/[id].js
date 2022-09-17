import React, { useEffect, useState } from "react";
import { Rate, notification, Tag } from "antd";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";

import { useRouter } from "next/router";
import { API } from "../../../utils/api";
import ProductDetailCard from "../../components/details";
const ProductDetails = () => {
  const [products, setProducts] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const addItemToCart = () => {
    const product = {
      id: products.id,

      price: products.price,

      category: products.category,
      image: products.image,

      quantity: 1,
    };
    //sending product as an action to REDUX STORE cart Slice
    dispatch(addToCart(product));
    notification.success({
      placement: "bottomLeft",
      duration: 3,
      message: `Added ${product.title} to cart`,
    });
  };
  const getProductByID = async () => {
    try {
      const response = await API.get(`/products/one/${router.query.id}`);
      const resData = await response?.data;
      const refactored = {
        ...resData,

        colors: JSON.parse(resData?.colors),
      };
      setProducts(refactored);
      console.log(refactored, "asdnakjs");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      getProductByID(router.query.id);
    }
  }, [router.query.id]);
  console.log(products, "sda");
  return (
    <>
      <ProductDetailCard
        onClick={addItemToCart}
        items={products}
        rate={products?.price}
        title={products?.title}
        image={products?.image}
      />
    </>
  );
};

export default ProductDetails;
