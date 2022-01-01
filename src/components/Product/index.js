import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import { notification, Rate, Tooltip } from "antd";
import { MedicineBoxOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { useState } from "react";
function Product({
  id,
  title,
  price,
  description,
  category,
  image,
  rate,
  requirePrescription,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const addItemToCart = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rate,
      requirePrescription,
      quantity: 1,
    };
    //sending product as an action to REDUX STORE cart Slice
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    notification.success({
      placement: "bottomLeft",
      duration: 3,
      message: `Added ${title} to cart`,
    });
  };

  return (
    <div className=" relative flex flex-col my-5 mx-2 bg-white backdrop-blur-sm z-30 px-10 py-5 shadow-md rounded-lg hover:drop-shadow-2xl hover:shadow-2xl transition-all delay-80">
      <p className="absolute top-2 right-2 text-gray-400">{category}</p>
      <Image
        src={image}
        height={150}
        width={150}
        objectFit="contain"
        onClick={() => router.push(`/product/${id}`)}
        className="cursor-pointer rounded"
        placeholder="blur"
        blurDataURL={true}
        loading="lazy"
      />
      <h4 className="text-lg my-3">{title}</h4>
      <p className="text-sm my-2 line-clamp-2 ">{description}</p>
      <span className="my-1">
        <Rate defaultValue={rate} allowHalf="true" />
      </span>
      <div className="mb-5 pt-2 text-xl font-semibold">
        <Currency quantity={price} currency="NPR" />
      </div>
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
      <button
        onClick={addItemToCart}
        disabled={added}
        className={`mt-auto button font-semibold ${
          added && `cursor-auto from-indigo-100 to-indigo-400 border-none`
        } `}
      >
        {added ? "Added to cart" : "Add to Cart"}
      </button>
    </div>
  );
}

export default Product;
