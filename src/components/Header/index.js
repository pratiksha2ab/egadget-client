import Image from "next/image";
import Link from "next/link";
import { SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { Modal, Button, Upload, Avatar, Popover, Menu } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../../slices/cartSlice";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../utils/AuthContext";
import { firebase } from "../../../utils/firebase";
import Search from "../Search";

function Header({ products }) {
  const { user, setUser, loggedInUser, setLoggedInUser } =
    useContext(AuthContext);
  const router = useRouter();
  const items = useSelector(selectItems);
  const [isVisible, setIsVisible] = useState(false);
  const content = (
    <Menu>
      <Menu.Item key="1">
        <Button>My Dashboard</Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button
          onClick={() => {
            firebase.auth().signOut();
            setUser(null);
            setLoggedInUser(null);
          }}
        >
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  const handleOk = () => {
    console.log("OK Clicked");
    setIsVisible(false);
  };
  return (
    <header className=" sticky top-0 z-50 bg-green-500 backdrop-blur-sm drop-shadow-xl rounded-b-xl  ">
      {/* top nav */}
      <div className="flex flex-wrap items-center  flex-grow space-y-2 p-2 ">
        <div className="flex p-2 h-10 items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="/HamroDeal4.PNG"
            width={190}
            height={50}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>

        <div className="flex order-last sm:order-none items-center max-w-xl mx-auto h-10  rounded-md flex-grow cursor-pointer bg-blue-400 hover:bg-blue-500 relative">
          <Search products={products} className="order-last sm:order-none" />
        </div>

        <div className="text-white flex items-center justify-center text-base space-x-4 px-2 md:space-x-10  whitespace-nowrap">
          {!user ? (
            <div className="link" onClick={() => router.push("/signin")}>
              <span className="text-sm font-bold tracking-wide md:text-base">
                Sign In
              </span>
            </div>
          ) : (
            <Popover
              content={content}
              placement="bottom"
              className="inline-flex p-4 space-x-2"
            >
              <Avatar
                size="small"
                icon={<UserOutlined />}
                src={loggedInUser?.data.photoUrl}
              />
              <p className="my-auto text-sm md:text-md md:font-semibold">
                Hello, {loggedInUser?.data?.fullName?.split(" ")[0]}
              </p>
            </Popover>
          )}
          <div
            onClick={() => router.push("/cart")}
            className="link relative flex items-center"
          >
            <span className="absolute top-0 right-0 h-2 w-2 md:h-4 md:w-4 flex items-center justify-center bg-blue-500 text-center rounded-full text-white font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="link h-7 md:h-10 text-white " />
          </div>
        </div>
      </div>
      {/* bottom nav */}
      <div className=" pt-2 pl-2 sm:pl-8 flex space-x-2  text-xs sm:text-sm sm:space-x-6  text-white tracking-wide font-semibold">
        <Link href="/product/hotDeal">
          <p className="link">Hot Deals</p>
        </Link>

        <Link href="/product/newest">
          <p className="link">Newest</p>
        </Link>

        <p className="link" onClick={() => router.push("/blog")}>
          Blog
        </p>
      </div>
    </header>
  );
}

export default Header;
