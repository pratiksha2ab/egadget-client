import React from "react";
import Image from "next/image";
import parse from "html-react-parser";
const BlogPage = ({ item }) => {
  return (
    <>
      <div
        className="min-h-screen"
        style={{
          backgroundColor: "#ddffaa",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23AE9' points='120 120 60 120 90 90 120 60 120 0 120 0 60 60 0 0 0 60 30 90 60 120 120 120 '/%3E%3C/svg%3E")`,
        }}
      >
        <div className="p-4 px-4 border-b sticky top-0 z-50 flex space-x-2 sm:space-x-4 md:space-x-10 shadow-lg bg-green-800 bg-opacity-25 backdrop-filter backdrop-blur-sm">
          <Image
            src="/l.png"
            width={160}
            height={50}
            objectFit="contain"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
          <h1 className="text-gray-900 pt-2 md:pt-4 font-bold text-lg sm:text-2xl md:text-3xl">
            Health Library
          </h1>
        </div>
        <div className=" max-w-screen-xl mx-auto pt-2 pb-5 md:pb-10 flex flex-col space-y-8 px-2 md:px-0">
          {/* blog goes here */}
          <p className="text-xl md:text-2xl font-bold text-gray-800 pt-2 md:pt-4 leading-8 px-2 border-b border-gray-400">
            {item.title}
          </p>
          <Image
            src={item.image}
            width={1500}
            height={600}
            objectFit="contain"
            className="rounded bg-gray-400"
          />
          <div className="bg-white bg-opacity-50 rounded p-2 md:p-4">
            <p className="text-gray-900">{parse(item.content)}</p>
          </div>
        </div>
        <div className="flex items-center justify-center bottom-0">
          <p className="md:text-lg">
            <span className="text-xl">&copy;</span> NepPharm.com
          </p>
        </div>
      </div>
    </>
  );
};

export default BlogPage;

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const res = await fetch("http://localhost:5000/blog/" + id);
  const blog = await res.json();
  return {
    props: {
      item: blog,
    },
  };
};
