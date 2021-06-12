import React, { useState } from "react";
import Image from "next/image";
import { Tag } from "antd";
import "antd/dist/antd.css";
function BlogContent({ id, title, image, tag, date, content }) {
  const [show, setShow] = useState(false);
  console.log(tag);
  return (
    <div className="max-w-screen-lg w-full mx-auto border-b bg-gray-100 shadow-xl">
      <div className="p-4 mt-2">
        <img src={image} className="rounded-lg" />
      </div>
      <div className="mx-10 py-2">
        <p className="text-xl tracking-normal md:text-2xl font-bold leading-5">
          {title}
        </p>
        <div className="flex space-y-2 items-baseline">
          <p className="text-sm text-gray-400 mx-0.5">Tags</p>
          {tag && tag.map((item) => <Tag>{item}</Tag>)}
          <p className="text-gray-500 text-sm">{date}</p>
        </div>
        <div className="mt-2">
          <p
            className={`${
              show && "line-clamp-none"
            } line-clamp-5 text-sm text-justify text-gray-800 md:text-lg tracking-normal leading-loose`}
          >
            {content}
          </p>
        </div>
        <button
          className="button md:text-lg rounded my-2"
          onClick={() => setShow(!show)}
        >
          {!show ? "Continue Reading" : "Hide Content"}
        </button>
      </div>
    </div>
  );
}

export default BlogContent;
