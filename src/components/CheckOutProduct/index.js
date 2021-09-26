import { Tooltip } from "antd";
import { MedicineBoxOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useState } from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../slices/cartSlice";
import QuantityCount from "../QuantityCount";

function CheckOutProduct({
  id,
  title,
  price,
  description,
  category,
  image,
  requirePrescription,
  quantity,
}) {
  const dispatch = useDispatch();

  // const addItemToBasket = () => {
  //   const product = {
  //     id,
  //     title,
  //     price,
  //     description,
  //     category,
  //     image,
  //     requirePrescription,
  //     quantity,
  //   };
  //   dispatch(addToCart(product));
  // };
  const [quantityUp, setQuantityUp] = useState(quantity);
  const removeItemFromCart = () => {
    dispatch(removeFromCart({ id }));
  };
  return (
    <div className="flex flex-col sm:grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />
      <div className="col-span-3 mx-5">
        <p className="font-bold pt-4 text-lg md:text-xl">{title}</p>
        <p className="text-sm my-2 line-clamp-3">{description}</p>
        {requirePrescription && (
          <div className="py-2">
            <Tooltip
              title="Prescription required"
              placement="right"
              color="#48BB78"
            >
              <span className="py-2">
                <MedicineBoxOutlined
                  style={{ fontSize: "24px", color: "#48BB78" }}
                />
              </span>
            </Tooltip>
          </div>
        )}
        <p className="font-semibold text-base">
          <Currency quantity={price} currency="NPR" /> {" * "}
          {quantity} {" = "}
          <Currency quantity={price * quantity} />
        </p>
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        {/* <button className="button" onClick={addItemToBasket}>
          Add to Cart
        </button> */}
        <QuantityCount
          id={id}
          dispatch
          setQuantity={setQuantityUp}
          quantity={quantityUp}
        />
        <button className="removeButton" onClick={removeItemFromCart}>
          Remove from Cart
        </button>
      </div>
    </div>
  );
}

export default CheckOutProduct;
