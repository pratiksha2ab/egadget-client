import Header from "../../../components/Header";
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";
import { useContext, useEffect, useState } from "react";
import KhaltiCheckout from "khalti-checkout-web";
import KhaltiConfig from "../../../../utils/khalti/KhaltiConfig";
import { selectTotal } from "../../../slices/cartSlice";
import { useSelector } from "react-redux";
import { firebase } from "../../../../utils/firebase";
import { AuthContext } from "../../../../utils/AuthContext";
import { useRouter } from "next/router";
function Checkout() {
  const [deliveryDetails, setDeliveryDetails] = useState({
    location: "",
    phone: "",
  });
  const Router = useRouter();
  const total = useSelector(selectTotal);
  const { user } = useContext(AuthContext);
  console.log("user in checkout page>>", user);
  const [checkout, setCheckout] = useState();
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

  const handlePhoneVerification = () => {
    const phonenumber = "+977" + deliveryDetails.phone;
    console.log(phonenumber);
    let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
    firebase
      .auth()
      .signInWithPhoneNumber(phonenumber, recaptcha)
      .then(function (e) {
        let code = window.prompt("enter otp", "");
        if (code == null) return;
        e.confirm(code)
          .then(function (result) {
            console.log(result.user, "user");
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };
  return (
    <>
      <Header />
      <main className="max-w-screen-md mx-auto">
        <div className="bg-white p-4 border-b space-y-10">
          <h1 className="text-lg md:text-2xl">Please fill the details</h1>
        </div>
        <div className="max-w-md mx-auto p-4">
          <Form layout="vertical" requiredMark={false}>
            <div id="recaptcha"></div>
            <Form.Item
              label={<h2 className="text-lg md:text-xl">Location</h2>}
              name="location"
              rules={[{ required: true, message: "please fill location" }]}
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
              rules={[{ required: true, message: "please fill phone number" }]}
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

              <button className="button" onClick={handlePhoneVerification}>
                Verify
              </button>
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
      </main>
    </>
  );
}

export default Checkout;
