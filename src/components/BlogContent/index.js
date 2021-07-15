import React, { useState } from "react";
import Image from "next/image";
import { Tag } from "antd";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import parse from "html-react-parser";
function BlogContent({ id, title, image, tag, date, content }) {
  const Router = useRouter();
  return (
    <div
      className="max-w-screen-lg w-full mx-auto border-b bg-gray-200 shadow-sm mb-4 hover:cursor-pointer hover:shadow-lg transition-all delay-50"
      onClick={() => Router.push(`/blog/${id}`)}
    >
      <div className="p-4 mt-2">
        <Image
          src={image}
          objectFit="contain"
          width={1500}
          height={300}
          className="rounded-lg bg-gray-400"
        />
        {/* img-resolution: 1500*600 */}
      </div>
      <div className="mx-10 py-2">
        <p className="text-xl tracking-normal md:text-2xl font-bold leading-5 pt-1">
          {title}
        </p>
        <div className="flex flex-wrap space-x-2 items-baseline  font-dmMono">
          {tag && tag.map((item) => <Tag key={item}>{item}</Tag>)}
          <p className="text-gray-500 text-sm">{date.split("T")[0]}</p>
        </div>
        <div className="mt-2">
          <p className=" line-clamp-3 text-sm text-justify text-gray-600 md:text-base tracking-normal leading-loose  font-dmMono">
            {parse(content)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BlogContent;
