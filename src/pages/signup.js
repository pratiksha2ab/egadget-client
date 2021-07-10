import React, { useEffect, useState } from "react";
import { Form, Button, Input, Upload, message, notification } from "antd";
import "antd/dist/antd.css";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import Axios from "axios";

function Signup() {
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
    fullName: "",
    address: "",
    phone: "",
    photoUrl: null,
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async () => {
    // setLoading(true);
    try {
      await auth.createUserWithEmailAndPassword(
        userDetail.email,
        userDetail.password
      );
      const users = auth.currentUser;
      console.log("my id>>>", users.uid);
      await Axios({
        method: "POST",
        url: "http://localhost:5000/users",
        data: {
          id: users.uid,
          fullName: userDetail.fullName,
          email: userDetail.email,
          address: userDetail.address,
          phone: userDetail.phone,
          photoUrl: userDetail.photoUrl,
        },
      });
      await users.sendEmailVerification({ url: "http://localhost:3000/" });
      notification.success({
        message: "Verification Link Sent to",
        description: userDetail?.email,
      });
      // console.log(userDetail);

      // router.push("/signin");
    } catch (e) {
      const users = auth.currentUser;
      users.delete();
      users.signOut();
      if (e.message) notification.error({ message: e?.message });
      else notification.error({ message: "Error Occured" });
    }
    //setLoading(false);
  };

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
      // console.log(file);
      setUserDetail({ ...userDetail, photoUrl: file });
    }
  };
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  return (
    <div className="bg-gray-100">
      <p className="text-md md:text-xl py-2 pl-6 text-gray-400 font-semibold border-b">
        Sign Up to NepPharm
      </p>
      <div className="flex flex-col justify-items-center items-center max-w-md mx-auto p-2">
        <Form
          onFinish={handleFormSubmit}
          layout="vertical"
          className=" w-full p-6 rounded mx-auto"
          requiredMark={false}
        >
          <div className="flex items-center justify-center">
            {userDetail.photoUrl && (
              <img
                className="w-16 h-16 rounded-full object-cover bg-gray-100 mb-2"
                src={userDetail.photoUrl}
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
            label={
              <strong className="text-lg text-gray-500">Full Name </strong>
            }
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
              onChange={(e) =>
                setUserDetail({ ...userDetail, fullName: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label={
              <strong className="text-lg text-gray-500">Phone Number</strong>
            }
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
            type="tel"
          >
            <Input
              type="number"
              placeholder="phone number"
              size="large"
              onChange={(e) =>
                setUserDetail({ ...userDetail, phone: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            name="address"
            label={<strong className="text-lg text-gray-500">Address</strong>}
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input
              placeholder="address"
              size="large"
              onChange={(e) =>
                setUserDetail({ ...userDetail, address: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={
              <strong className="text-lg text-gray-500">E-mail Address </strong>
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
              onChange={(e) =>
                setUserDetail({ ...userDetail, email: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<strong className="text-lg text-gray-500">Password</strong>}
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
              <strong className="text-lg text-gray-500">
                Confirm Password{" "}
              </strong>
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
              onChange={(e) =>
                setUserDetail({ ...userDetail, password: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="my-3 text-md w-full"
              style={{
                backgroundColor: "#48BB78",
                border: "#48BB78",
              }}
              loading={loading}
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
