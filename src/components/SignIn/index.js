import {
  Form,
  Button,
  Input,
  message,
  notification,
  Modal,
  Upload,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { auth } from "../../../utils/firebase";
import React, { useState } from "react";
//import { useHistory } from "react-router-dom";
import { useRouter } from "next/router";
import Image from "next/image";

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  //const history = useHistory();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const handleFormSubmit = async () => {
    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(user.email, user.password);

      notification.success({
        message: "Login Sucess",
        description: "Welcome to NepPharm",
      });
      router.push("/");
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
    <div className="flex flex-col justify-items-center items-center p-6 bg-green-400">
      <Form
        onFinish={handleFormSubmit}
        layout="vertical"
        className="max-w-md w-full p-6 rounded"
      >
        <div className="mb-3 flex">
          <Image
            width={160}
            height={50}
            src="/neppharm.png"
            objectFit="contain"
          />
        </div>

        <Form.Item
          label={<strong className="text-lg">E-mail Address </strong>}
          rules={[
            {
              required: true,
              message: "Email Address Is Required",
            },
          ]}
          name="email"
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
            type="email"
            size="large"
          />
        </Form.Item>
        <Form.Item
          label={<strong className="text-lg">Password</strong>}
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
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            className="my-3  text-md w-full"
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
            className="text-black hover:text-gray-700"
            onClick={() => setIsVisible(true)}
          >
            Forgot Password ? Click here
          </a>
        </div>
        <div className="text-center mt-2 text-lg underline">
          <a className="text-black hover:text-gray-700" href="/create-account">
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
  );
};

export default SignIn;
