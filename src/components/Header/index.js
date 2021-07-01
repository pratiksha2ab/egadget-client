import Image from "next/image";
import { SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { Modal, Button, Upload, Avatar, Popover, Menu } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../../slices/cartSlice";
import { useState, useContext } from "react";
import { AuthContext } from "../../../utils/AuthContext";
import { firebase } from "../../../utils/firebase";
function Header() {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  const items = useSelector(selectItems);
  const [isVisible, setIsVisible] = useState(false);
  const content = (
    <Menu>
      <Menu.Item>
        <Button
          onClick={() => {
            firebase.auth().signOut();
            setUser(null);
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
  console.log("user>>", user);
  return (
    <header className="sticky top-0 z-50 font-montserrat">
      {/* top nav */}
      <div className="flex items-center bg-gradient-to-tl from-green-500 to-green-700  flex-grow py-2 p-1 ">
        <div className="flex h-10 items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="/l.png"
            width={160}
            height={50}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        <div className=" hidden sm:flex items-center max-w-xl mx-auto h-10 rounded-md flex-grow cursor-pointer bg-blue-400 hover:bg-blue-500">
          <input
            className="p-2 text-lg  h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />
          <SearchIcon className="h-12 p-4 text-white" />
        </div>
        <div className="text-white flex items-center text-base space-x-10 mx-6 whitespace-nowrap">
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
              <Avatar size="small" icon={<UserOutlined />} />
              <p className="my-auto font-medium">Hello, {user?.email}</p>
            </Popover>
          )}
          {/* <div className=" link flex">
            <button
              className="font-bold tracking-wide  focus:outline-none"
              onClick={() => setIsVisible(true)}
            >
              UPLOAD
            </button>
          </div> */}
          <div
            onClick={() => router.push("/cart")}
            className="link relative flex items-center"
          >
            <span className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center bg-blue-500 text-center rounded-full text-white font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="link h-10 text-white" />
          </div>
        </div>
        {/* <Modal
          title="Upload Prescription"
          visible={isVisible}
          onCancel={() => setIsVisible(false)}
          onOk={handleOk}
        >
          <div className="grid place-items-center">
            <Upload accept="image/*, .pdf">
              <Button icon={<UploadOutlined />}>upload</Button>
            </Upload>
          </div>
        </Modal> */}
      </div>
      {/* bottom nav */}
      <div className="p-2 bg-gradient-to-b from-green-500 to-green-600 sm:hidden">
        <div className="flex items-center h-8 rounded-md flex-grow cursor-pointer bg-blue-400 hover:bg-blue-500 ">
          <input
            className="p-2  h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />
          <SearchIcon className="h-12 p-4 text-white" />
        </div>
      </div>
      <div className=" pt-2 pl-2 sm:pl-8 flex  text-center space-x-2  text-xs sm:text-sm sm:space-x-6  bg-gradient-to-b from-green-500 to-green-600  text-white tracking-wide font-semibold">
        <p className="link">Medicines</p>

        <p className="link">Health Products</p>

        <p className="link">Diagnostic</p>

        <p className="link" onClick={() => router.push("/blog")}>
          Health Corner
        </p>
      </div>
    </header>
  );
}

export default Header;
