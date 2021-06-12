import { notification } from "antd";
import React, { createContext, useEffect, useState } from "react";
import { firebase } from "./firebase";
export const AuthContext = createContext();
import { useRouter } from "next/router";

const AuthProvider = (props) => {
  const [user, setUser] = useState();
  const Router = useRouter();
  const loadUserFromFirebase = () => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (!user?.emailVerified && user) {
        firebase.auth().signOut();
        notification.warning({
          message: "Please verify your email",
        });
        Router.push("/signin");
      } else {
        setUser(user);
      }
    });
  };
  useEffect(() => {
    loadUserFromFirebase();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
