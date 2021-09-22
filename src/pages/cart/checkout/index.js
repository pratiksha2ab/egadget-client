import { Form, Input, Button, Steps, Upload } from "antd";
import "antd/dist/antd.css";
import React, { useContext, useEffect, useState } from "react";
import KhaltiCheckout from "khalti-checkout-web";
import KhaltiConfig from "../../../../utils/khalti/KhaltiConfig";
import {
  selectPrescribed,
  selectTotal,
  destroyCart,
} from "../../../slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { firebase } from "../../../../utils/firebase";
import { AuthContext } from "../../../../utils/AuthContext";
import { useRouter } from "next/router";

const { Step } = Steps;
function Checkout() {
  const [deliveryDetails, setDeliveryDetails] = useState({
    location: "",
    phone: "",
  });
  const Router = useRouter();
  const dispatch = useDispatch();
  const total = useSelector(selectTotal);
  const prescribed = useSelector(selectPrescribed);
  console.log("prescribed>>>>>", prescribed);
  const { user } = useContext(AuthContext);
  console.log("user in checkout page>>", user);
  const [checkout, setCheckout] = useState();
  const [currentProgress, setCurrentProgress] = useState(0);
  useEffect(() => {
    if (!user) {
      Router.push("/signin");
    }
    setCheckout(new KhaltiCheckout(KhaltiConfig));
  }, []);
  const handleFormSubmit = async () => {
    await checkout.show({ amount: total * 100 });
    console.log(deliveryDetails);
    setCurrentProgress(2);
  };
  const backtoHome = () => {
    dispatch(destroyCart);
    Router.push("/");
  };
  const showDataofProgress = (currentPage) => {
    switch (currentPage) {
      case 0:
        return (
          <>
            {prescribed ? (
              <>
                <Upload>
                  <Button>Upload Prescription</Button>
                </Upload>
                <Button onClick={() => setCurrentProgress(1)}>Submit</Button>
              </>
            ) : (
              <>
                <Button onClick={() => setCurrentProgress(1)}>Continue</Button>
              </>
            )}
          </>
        );
      case 1:
        return (
          <>
            <div className="max-w-md mx-auto p-4">
              <Form layout="vertical" requiredMark={false}>
                <Form.Item
                  label={<h2 className="text-lg md:text-xl">Location</h2>}
                  name="location"
                  rules={[{ required: true, message: "Delivery Location" }]}
                >
                  <Input
                    onChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        location: e.target.value,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item
                  label={<h2 className="text-lg md:text-xl">Phone Number</h2>}
                  name="phone"
                  rules={[{ required: true, message: "Contact Number" }]}
                >
                  <Input
                    type="number"
                    maxLength="10"
                    minLength="10"
                    onChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        phone: e.target.value,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item>
                  <button
                    onClick={handleFormSubmit}
                    className="bg-indigo-700 text-white text-lg text-center p-2 rounded items-center"
                  >
                    Pay via Khalti
                  </button>
                </Form.Item>
              </Form>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="mt-2 p-4 font-medium sm:text-md lg:text-xl space-y-5">
              <p>
                Your order has been successfully placed. You will be receiving a
                confirmation soon. Thank you for purchasing with us.
              </p>
              <Button onClick={backtoHome}>Back to Home</Button>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <main className="max-w-screen-md mx-auto p-2 space-y-4">
        <Steps current={currentProgress} responsive={true}>
          <Step
            title={prescribed ? "Upload prescription" : "Continue to payment"}
          />
          <Step title="Payment" />
          <Step title="Thank you" status="finish" />
        </Steps>
        <div className="py-4 space-y-2">
          {showDataofProgress(currentProgress)}
        </div>
      </main>
    </>
  );
}

export default Checkout;
