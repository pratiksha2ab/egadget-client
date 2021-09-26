import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../../slices/cartSlice";
import CheckOutProduct from "../../components/CheckOutProduct";
import { useRouter } from "next/router";
import Currency from "react-currency-formatter";
import { useContext } from "react";
import { AuthContext } from "../../../utils/AuthContext";
import Header from "../../components/Header";
function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const router = useRouter();
  const { user } = useContext(AuthContext);
  console.log("user>>>", user);
  console.log("item>>>", items);
  return (
    <div className="bg-gray-200">
      <Header />
      <main className="lg:flex max-w-screen-xl mx-auto">
        {/* left */}
        <div className="flex-grow m-5 shadow-sm">
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0 ? "Your Cart is empty." : "Your Cart"}
            </h1>
            {items.map((item, key) => (
              <CheckOutProduct
                key={key}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                requirePrescription={item.requirePrescription}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>
        {/* right */}
        <div className="flex flex-col bg-white p-10 shadow-md m-5">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Total ({items.length} items):{" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="NPR" />
                </span>
              </h2>
            </>
          )}
          <button
            disabled={!user && items.length === 0}
            className={`button mt-2 ${
              (items.length === 0 || !user) &&
              "from-gray-300 to-gray-500 border-gray-200 text-gray-100 cursor-not-allowed"
            }`}
            onClick={() => router.push("/cart/checkout")}
          >
            {!user ? "Sign in to Checkout" : "Proceed to Checkout"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
