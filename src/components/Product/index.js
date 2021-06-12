import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import { notification, Rate } from "antd";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
function Product({ id, title, price, description, category, image, rate }) {
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
    };
    //sending product as an action to REDUX STORE cart Slice
    dispatch(addToCart(product));
    notification.success({
      placement: "bottomLeft",
      duration: 3,
      message: `Added ${title} to cart`,
    });
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
      />
      <h4 className="my-3">{title}</h4>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <span className="my-1">
        <Rate defaultValue={rate} allowHalf="true" />
      </span>
      <div className="mb-5 font-semibold">
        <Currency quantity={price} currency="NPR" />
      </div>
      <button onClick={addItemToCart} className="mt-auto button font-semibold">
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
