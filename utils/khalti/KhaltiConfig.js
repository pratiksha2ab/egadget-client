import Axios from "axios";
let KhaltiConfig = {
  publicKey: process.env.test_public_key,
  productIdentity: "1234567890",
  productName: "NepPharm",
  productUrl: "http://localhost:3000",
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verfication
      console.log(payload);
      // Axios({
      //   method: "POST",
      //   url: "http://localhost:5000/khalti",
      //   data: {
      //     amount: payload.amount,
      //     token: payload.token,
      //   },
      // });
    },
    // onError handler is optional
    onError(error) {
      // handle errors
      console.log(error);
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

export default KhaltiConfig;
