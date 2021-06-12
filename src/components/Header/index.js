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
    <header className="sticky top-0 z-50">
      {/* top nav */}
      <div className="flex items-center bg-gradient-to-tl from-green-500 to-green-700 p-1 flex-grow py-2 ">
        <div className="p-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="/logo2.png"
            width={150}
            height={50}
            quality="100"
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        <div className=" hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-blue-400 hover:bg-blue-500">
          <input
            className="p-2  h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />
          <SearchIcon className="h-12 p-4 text-white" />
        </div>
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap ">
          {!user ? (
            <div className="link" onClick={() => router.push("/signin")}>
              <p>Hello, Guest</p>
              <span className="text-sm font-bold tracking-wide">Sign In</span>
            </div>
          ) : (
            <Popover
              content={content}
              placement="bottom"
              className="md:flex p-4"
            >
              <Avatar size="small" icon={<UserOutlined />} />
              <p className="md:px-4 my-auto">{user?.email}</p>
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
            <span className="absolute top-0 right-0 h-4 w-4 bg-blue-500 text-center rounded-full text-white font-bold">
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
      <div className=" p-2 bg-gradient-to-b from-green-500 to-green-600 sm:hidden">
        <div className="flex items-center h-8 rounded-md flex-grow cursor-pointer bg-blue-400 hover:bg-blue-500 ">
          <input
            className="p-2  h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />
          <SearchIcon className="h-12 p-4 text-white" />
        </div>
      </div>
      <div className="flex text-center items-center text-xs bg-gradient-to-b from-green-500 to-green-600 justify-around md:text-sm text-white tracking-wide font-semibold  p-2">
        <div className="link">
          <p>Medicines</p>
        </div>

        <div className="link">
          <p>Health Products</p>
        </div>

        <div className="link">
          <p>Diagnostic</p>
        </div>

        <div className="link" onClick={() => router.push("/blog")}>
          <p>Health Corner</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
