import {
  Form,
  Input,
  Button,
  Steps,
  Upload,
  notification,
  message,
} from "antd";
import "antd/dist/antd.css";
import Header from "../../../components/Header";
import React, { useContext, useEffect, useState } from "react";
import KhaltiCheckout from "khalti-checkout-web";
//import KhaltiConfig from "../../../../utils/khalti/KhaltiConfig";
import { selectPrescribed, selectTotal } from "../../../slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
//import { auth } from "../../utils/firebase";
import { AuthContext } from "../../../../utils/AuthContext";
import { useRouter } from "next/router";
import { selectItems } from "../../../slices/cartSlice";
import Axios from "axios";
const { Step } = Steps;
function Checkout() {
  const [deliveryDetails, setDeliveryDetails] = useState({
    location: "",
    phone: "",
  });
  const [selectedFile, setSelectedFile] = useState();
  const Router = useRouter();
  const total = useSelector(selectTotal);
  const prescribed = useSelector(selectPrescribed);
  console.log("prescribed>>>>>", prescribed);
  const { user } = useContext(AuthContext);
  const [checkout, setCheckout] = useState();
  const [currentProgress, setCurrentProgress] = useState(0);
  const cartItems = useSelector(selectItems);
  let KhaltiConfig = {
    publicKey: process.env.test_public_key,
    productIdentity: "1234567890",
    productName: "NepPharm",
    productUrl: "http://localhost:3000",
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        saveOrdersToDatabase(payload);
      },
      // onError handler is optional
      onError(error) {
        // handle errors

        notification.error({
          message: "Error occurred while adding product",
          description: `${error.message}`,
        });
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };
  useEffect(() => {
    if (!user) {
      Router.push("/signin");
    }
    setCheckout(new KhaltiCheckout(KhaltiConfig));
  }, []);

  const handleFormSubmit = async () => {
    await checkout.show({ amount: total * 100 });
    console.log(deliveryDetails);
  };
  const backtoHome = () => {
    Router.push("/");
  };
  const prescriptionUploader = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      console.log("file is uploaded>>", info.file);
      setSelectedFile(info.file.originFileObj);
      message.success(`${info.file.name} prescription uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  console.log("selectedFile>>>", selectedFile);
  const saveOrdersToDatabase = async (payload) => {
    console.log(payload);
    console.log("cart items>>", cartItems);
    console.log("id>>", user.uid);
    console.log("file>>>>", selectedFile);
    console.log("delivery>>>", deliveryDetails);
    const formData = new FormData();
    formData.append("prescriptionImage", selectedFile);
    formData.append("UserId", user.uid);
    formData.append("deliveryLocation", deliveryDetails.location);
    formData.append("phoneNumber", deliveryDetails.phone);
    formData.append("total", payload.amount / 100);
    formData.append("orderItems", JSON.stringify(cartItems));
    await Axios({
      method: "POST",
      url: "http://localhost:5000/orders",
      data: formData,
    });
    payload ? setCurrentProgress(2) : null;
  };

  const showDataofProgress = (currentPage) => {
    switch (currentPage) {
      case 0:
        return (
          <>
            {prescribed ? (
              <div className="mt-2 p-4 font-medium sm:text-md lg:text-xl space-y-8">
                <Upload
                  onChange={prescriptionUploader}
                  maxCount={1}
                  listType="picture"
                >
                  <Button>Upload Prescription</Button>
                </Upload>
                <Button onClick={() => setCurrentProgress(1)}>Next</Button>
              </div>
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
                  label={
                    <h2 className="text-lg md:text-xl">Delivery location:</h2>
                  }
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
                  label={<h2 className="text-lg md:text-xl">Phone number:</h2>}
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
                    className="bg-indigo-700 text-white text-lg text-center mt-2 p-2 rounded items-center "
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
            <div className="mt-2 p-4 font-medium sm:text-md lg:text-xl space-y-8">
              <p>
                Your order has been successfully placed. You will be receiving a
                confirmation soon. Thank you for purchasing with us.
              </p>
              <div className="flex space-x-10 justify-center">
                <Button onClick={backtoHome}>Back to Home</Button>
                <Button>Go to Dashboard</Button>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-screen-md mx-auto mt-10 px-10 space-y-4">
        <Steps current={currentProgress} responsive={true}>
          <Step
            title={prescribed ? "Upload prescription" : "Continue to pay"}
          />
          <Step title="Payment" />
          <Step title="Thank you" />
        </Steps>
        <div className="py-4 space-y-2">
          {showDataofProgress(currentProgress)}
        </div>
      </main>
    </>
  );
}

export default Checkout;
