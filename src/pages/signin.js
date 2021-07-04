import { Form, Button, Input, message, notification, Modal } from "antd";
import "antd/dist/antd.css";
import { auth } from "../../utils/firebase";
import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../utils/AuthContext";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const { setUser } = useContext(AuthContext);
  const handleFormSubmit = async () => {
    setLoading(true);
    try {
      const user = await auth.signInWithEmailAndPassword(
        userInfo.email,
        userInfo.password
      );

      // notification.success({
      //   message: "Login Sucess",
      //   description: "Welcome to NepPharm",
      // });
      setUser(user);
      // router.back();
    } catch (e) {
      message.error(e?.message);
    }
    setLoading(false);
  };
  const handlePassword = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      notification.success({
        message: `Email sent For Passowrd reset to ${email}`,
      });
      setIsVisible(false);
    } catch (e) {
      message.error(e?.message);
    }
  };

  return (
    <div className="bg-gray-100">
      <p className="text-md md:text-xl py-2 pl-6 text-gray-400 font-semibold border-b">
        Sign In to NepPharm
      </p>
      <div className="flex flex-col justify-items-center items-center max-w-md mx-auto p-2">
        <Form
          onFinish={handleFormSubmit}
          layout="vertical"
          className="w-full rounded"
          requiredMark={false}
        >
          <Form.Item
            label={
              <strong className="text-lg text-gray-500">E-mail Address </strong>
            }
            rules={[
              {
                required: true,
                message: "Email Address Is Required",
              },
            ]}
            name="email"
          >
            <Input
              placeholder="email"
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              value={userInfo.email}
              type="email"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label={<strong className="text-lg text-gray-500">Password</strong>}
            rules={[
              {
                required: true,
                message: "Password Is Required",
              },
            ]}
            name="password"
            hasFeedback
          >
            <Input.Password
              placeholder="password"
              value={userInfo.password}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              type="password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="my-3 text-md w-full"
              style={{
                backgroundColor: "#48BB78",
                border: "#48BB78",
              }}
              htmlType="submit"
              type="primary"
              size="large"
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
          <div className="text-center -mt-4 text-sm">
            <a
              className="text-gray-500 tracking-wide hover:underline hover:text-black"
              onClick={() => setIsVisible(true)}
            >
              Forgot Password ? Click here
            </a>
          </div>
          <div className="text-center my-2 text-lg underline">
            <a
              className="text-gray-500 tracking-wide hover:underline hover:text-black "
              onClick={() => router.push("/signup")}
            >
              Create New account
            </a>
          </div>
        </Form>
        <Modal
          title="Password Reset"
          visible={isVisible}
          onCancel={() => setIsVisible(false)}
          footer={null}
        >
          <Form layout="vertical" onFinish={handlePassword}>
            <Form.Item requiredMark label="Email Address">
              <Input
                size="large"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder={"Enter Your Email"}
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                disabled={email === "" ? true : false}
              >
                Send Password Reset Email
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default SignIn;
