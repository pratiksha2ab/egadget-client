import { notification } from "antd";
import React, { createContext, useEffect, useState } from "react";
import { firebase } from "./firebase";
export const AuthContext = createContext();
import { useRouter } from "next/router";

const AuthProvider = (props) => {
  const [user, setUser] = useState();
  const [loggedInUser, setLoggedInUser] = useState();
  const Router = useRouter();
  const loadUserFromFirebase = () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      console.log("authcontext >>>>", user, loggedInUser);
      if (!user?.emailVerified && user) {
        firebase.auth().signOut();
        notification.warning({
          message: "Please verify your email",
        });
        Router.push("/signin");
      } else {
        await setUser(user);
      }
    });
  };
  useEffect(() => {
    loadUserFromFirebase();
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, setUser, loggedInUser, setLoggedInUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
