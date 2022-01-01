import { updateQuantity } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";

function QuantityCount({
  setQuantity,
  quantity = 1,
  dispatch = false,
  id = null,
}) {
  const newDispatch = useDispatch();
  const increaseCount = () => {
    setQuantity(quantity + 1);
    updateQuantityHere(quantity + 1);
  };
  const decreaseCount = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      updateQuantityHere(quantity - 1);
    }
  };

  const updateQuantityHere = (count) => {
    if (dispatch) {
      const product = { id, quantity: count };
      newDispatch(updateQuantity(product));
    }
  };
  return (
    <div className="flex items-center justify-center space-x-8">
      <button
        onClick={decreaseCount}
        className="bg-indigo-100 w-10 h-10 text-lg active:bg-green-500 hover:bg-indigo-200"
      >
        -
      </button>
      <div className="">{quantity}</div>
      <button
        onClick={increaseCount}
        className="bg-indigo-100 w-10 h-10 text-lg active:bg-green-500 hover:bg-indigo-200"
      >
        +
      </button>
    </div>
  );
}

export default QuantityCount;
