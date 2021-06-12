import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Input,
  Select,
  Upload,
  message,
  notification,
} from "antd";

import "antd/dist/antd.css";
import { auth, firebase } from "../../utils/firebase";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

function Signup() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    address: "",
    phone: "",
  });
  const router = useRouter();

  const handleFormSubmit = async () => {
    try {
      await auth.createUserWithEmailAndPassword(user.email, user.password);
      const users = auth.currentUser;
      await users.sendEmailVerification({ url: "http://localhost:3000/" });
      notification.success({
        message: "Verification Link Sent to",
        description: user?.email,
      });
      router.push("/signin");
    } catch (e) {
      message.error(e?.message);
      if (e.message) notification.error({ message: e?.message });
      else notification.error({ message: "Error Occured" });
    }
  };

  const [fileList, setFileList] = useState();
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const handleChange = async (info) => {
    console.log(info.file);
    if (info.file.status === "done") {
      const file = await getBase64(info.file.originFileObj);
      console.log(file);
      setFileList(file);
    }
  };
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  return (
    <div className="bg-gradient-to-tl from-green-500 to-green-700 h-auto ">
      <div className="flex flex-col justify-items-center items-center p-6 max-w-md mx-auto">
        <Form
          onFinish={handleFormSubmit}
          layout="vertical"
          className=" w-full p-6 rounded mx-auto shadow-xl"
        >
          <div className="my-6 flex cursor-pointer">
            <Image
              width={160}
              height={50}
              src="/neppharm.png"
              objectFit="contain"
              onClick={() => router.push("/")}
            />
          </div>
          <div className="flex items-center justify-center">
            {fileList && (
              <img
                className="w-16 h-16 rounded-full object-cover bg-gray-100 mb-2"
                src={fileList}
                alt="profile image"
              />
            )}
          </div>
          <div className="flex justify-center items-center">
            <Upload
              className="flex mx-auto  mb-3"
              showUploadList={false}
              onChange={handleChange}
              customRequest={dummyRequest}
            >
              <Button className="button">Upload Image</Button>
            </Upload>
          </div>

          <Form.Item
            name="username"
            label={<strong className="text-lg text-white">Full Name </strong>}
            rules={[
              {
                required: true,
                message: "Please input your username!",
                whitespace: true,
              },
            ]}
          >
            <Input
              placeholder="full name"
              size="large"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label={<strong className="text-lg text-white">Phone Number</strong>}
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
            type="tel"
          >
            <Input
              type="number"
              placeholder="phone number"
              size="large"
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={
              <strong className="text-lg text-white">E-mail Address </strong>
            }
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              placeholder="email"
              size="large"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<strong className="text-lg text-white">Password</strong>}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="password" size="large" />
          </Form.Item>
          <Form.Item
            name="confirm"
            label={
              <strong className="text-lg text-white">Confirm Password </strong>
            }
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder=" re-enter password"
              size="large"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="my-3 text-md w-full"
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
