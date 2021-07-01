import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import { notification, Rate, Tooltip } from "antd";
import { MedicineBoxOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
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
    };
    //sending product as an action to REDUX STORE cart Slice
    dispatch(addToCart(product));
    notification.success({
      placement: "bottomLeft",
      duration: 3,
      message: `Added ${title} to cart`,
    });
    console.log(product);
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10 shadow-md rounded">
      <p className="absolute top-2 right-2 text-gray-400">{category}</p>
      <Image
        src={image}
        height={200}
        width={200}
        objectFit="contain"
        onClick={() => router.push(`/product/${id}`)}
        className="cursor-pointer rounded"
        placeholder="blur"
      />
      <h4 className="my-3">{title}</h4>
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
      <button onClick={addItemToCart} className="mt-auto button font-semibold">
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
