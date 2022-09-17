import React from "react";
import Image from "next/image";
import { Button, Form, Input } from "antd";
import {
  FacebookOutlined,
  InstagramFilled,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import Link from "next/link";
const Footer = () => {
  const { TextArea } = Input;
  return (
    <div className="bottom-0 z-50  px-8 pt-4 pb-2 bg-green-100">
      <div className="flex flex-col sm:flex-row justify-between sm:space-x-6 border-b  border-blue-400 pb-4">
        <Image
          onClick={() => router.push("/")}
          src="/HamroDeal4.PNG"
          width={190}
          height={50}
          objectFit="contain"
          className="cursor-pointer bg-green-500 rounded-md"
        />
        <div className="text-sm py-3 text-gray-600 md:text-md">
        “DealNepal” is a full stack interactive B2C e-commerce providing
            users with a platform to buy and review the electronics related product with 3D visualization. We believe
          in serving through excellence.
        </div>
      </div>
      <div className="py-6 max-w-[100%] flex flex-col md:flex-row justify-evenly">
        <div>
          <p className="text-xl font-semibold text-gray-600">
            Got Queries? Contact us
          </p>
          <Form layout="inline" colon={false} 
            >
            <Form.Item
              label={<p className="font-semibold md:text-md">Your email</p>}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label={<p className="font-semibold md:text-md">Your queries</p>}
            >
              <TextArea autoSize="false" size="large" />
            </Form.Item>
            <Form.Item>
            <Button
              className="my-3 text-md "
              style={{
                backgroundColor: "#48BB78",
                border: "#48BB78",
              }}
              htmlType="submit"
              type="primary"
              size="medium"
             
            >
              Submit
            </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="mt-2 py-2 md:py-0 md:mt-0">
          <p className="text-xl font-semibold text-gray-600">Get In Touch</p>
          <div className="flex justify-evenly text-xl space-x-6">
          <Link href="/" passHref><FacebookOutlined width='80px' height='80px' color='#fff'/></Link> 
          <Link href="/" passHref><InstagramOutlined width='80px' height='80px' color='#fff'/></Link> 
          <Link href="/" passHref><YoutubeOutlined width='80px' height='80px' color='#fff'/></Link> 
          </div>
        </div>
      </div>
      <p className="text-lg text-gray-500 text-center pt-4 ">
        &copy; DealNepal.com
      </p>
    </div>
  );
};

export default Footer;
