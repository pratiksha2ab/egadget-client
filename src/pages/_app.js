import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Header from "../components/Header";
import { store } from "../app/store";
import { Provider } from "react-redux";
import AuthProvider from "../../utils/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import CallToActionWithIllustration from "../components/Hero";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ChakraProvider>
          {/* <Header /> */}
          <CallToActionWithIllustration />
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
