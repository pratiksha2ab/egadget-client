import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import Header from "../components/Header";
import { store } from "../app/store";
import { Provider } from "react-redux";
import AuthProvider from "../../utils/AuthContext";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        {/* <Header /> */}
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
