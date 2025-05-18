import React from "react";
import { getBlogs } from "@/services/blogs/blogService";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import Container from "../container";
import BlogPagination from "./BlogPagination";
import ExpandableText from "./ExpandableText";
import { getBlogsCat } from "@/services/blogs/blogCategory";
import EmptyBlogs from "./EmptyBlogs";

async function BoxImgBlog({
  page,
  pageSize,
  searchParams,
  category,
  blogs,
  totalCount,
}) {
  const activeCategory = searchParams?.category;

  return (
    <Container>
      <div className="flex flex-wrap items-center pt-20">
        {category.map((cat) => (
          <div key={cat.id} className="p-4 lg:w-[14.286%] sm:w-1/4 w-1/2">
            <Link
              href={`?${(() => {
                const params = new URLSearchParams(searchParams);
                params.delete("category");
                if (activeCategory !== cat.id.toString()) {
                  params.set("category", cat.id);
                }
                return params.toString();
              })()}`}
              className="flex flex-col justify-center items-center"
              scroll={false}
            >
              <div
                className={`rounded-[50px] overflow-hidden cursor-pointer border-4 h-52 ${
                  activeCategory === cat.id.toString()
                    ? "border-teal-500 shadow-lg"
                    : "border-transparent"
                }`}
              >
                <img className="w-full h-full object-cover" src={cat.img} alt="" />
              </div>
              <p
                className={`cursor-pointer mt-4 text-lg font-semibold ${
                  activeCategory === cat.id.toString() ? "text-teal-500" : ""
                }`}
              >
                {cat.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap pt-10">
        {blogs.map((blog) => (
          <div key={blog.id} className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2">
            <div className="rounded-lg group overflow-hidden bg-white relative z-50">
              <div className="absolute top-0 left-0 z-50 duration-300">
                <span className="bg-[#d1182b] text-white px-3 py-1 rounded-br-2xl flex items-center">
                  2.4 <FaStar className="px-1 text-xl" />
                </span>
              </div>
              <div className="overflow-hidden relative cursor-pointer">
                <Link href={blog.url}>
                  <img
                    className="group-hover:scale-120 scale-100 duration-500 ease-out group-hover:grayscale-[0.7] filter brightness-[0.95] w-full"
                    src={blog.img}
                    alt=""
                  />
                  <hr className="w-14 absolute top-1/2 left-full ease-out duration-300 translate-x-0 -translate-y-1/2 border-[1.5px] border-[#fff] group-hover:left-1/2 group-hover:-translate-x-1/2" />
                  <hr className="w-14 absolute -top-full left-1/2 ease-out duration-300 -translate-x-1/2 translate-y-0 border-[1.5px] border-[#fff] group-hover:top-1/2 group-hover:-translate-y-1/2 rotate-90" />
                </Link>
              </div>

              <div className="p-3">
                <h3 className="h-12 line-clamp-2">
                  <Link
                    className="font-bold hover:text-[#d1182b] duration-300"
                    href={blog.url}
                  >
                    {blog.title}
                  </Link>
                </h3>
                <div className="min-h-[100px]">
                  <ExpandableText text={blog.desc} />
                </div>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <FaCircleUser className="text-xs text-[#d1182b]" />
                    <span className="text-xs font-semibold px-1">
                      {blog.producer}
                    </span>
                  </div>
                  <div className="text-xs font-semibold">
                    {blog.dateProduct}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <BlogPagination total={totalCount} pageSize={pageSize} current={page} />
      {blogs.length === 0 && <EmptyBlogs />}
    </Container>
  );
}

export default BoxImgBlog;
