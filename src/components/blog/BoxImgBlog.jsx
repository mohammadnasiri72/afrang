"use client";
import { getImageUrl } from "@/utils/mainDomain";
import moment from "moment-jalaali";
import Image from "next/image";
import Link from "next/link";
import { FaCircleUser } from "react-icons/fa6";
import Container from "../container";
import BlogPagination from "./BlogPagination";
import EmptyBlogs from "./EmptyBlogs";
import ExpandableText from "./ExpandableText";

function BoxImgBlog({ blogs = [], searchParams }) {
  const formatPersianDate = (dateString) => {
    try {
      const persianMonths = [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
      ];

      const date = moment(dateString);
      const day = date.jDate();
      const month = persianMonths[date.jMonth()];
      const year = date.jYear();

      return `${day} ${month} ${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  return (
    <>
      <Container>
        <div className="flex flex-wrap pt-10">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2"
            >
              <div className="rounded-lg group overflow-hidden bg-white relative z-50">
                <div className="overflow-hidden relative cursor-pointer flex items-center justify-center">
                  <Link
                    href={blog.url}
                    className="flex items-center justify-center"
                  >
                    <div className="relative h-[200px] w-full">
                      <Image
                        className="group-hover:scale-120 scale-100 duration-500 ease-out group-hover:grayscale-[0.7] filter brightness-[0.95] object-cover w-full h-full"
                        src={
                          blog.image && blog.image !== "NULL"
                            ? getImageUrl(blog.image)
                            : "/images/blog-img1.jpg"
                        }
                        alt={blog.title || "تصویر مقاله"}
                        width={200}
                        height={200}
                        unoptimized
                      />
                    </div>
                    <hr className="w-14 absolute top-1/2 left-full ease-out duration-300 translate-x-0 -translate-y-1/2 border-[1px] border-[#fff] group-hover:left-1/2 group-hover:-translate-x-1/2" />
                    <hr className="w-14 absolute -top-full left-1/2 ease-out duration-300 -translate-x-1/2 translate-y-0 border-[1px] border-[#fff] group-hover:top-1/2 group-hover:-translate-y-1/2 rotate-90" />
                  </Link>
                </div>

                <div className="p-3">
                  <h2 className="h-12 line-clamp-2">
                    <Link
                      className="font-bold hover:text-[#d1182b] duration-300 text-justify"
                      href={blog.url}
                    >
                      {blog.title}
                    </Link>
                  </h2>
                  <div className="min-h-[100px] text-justify">
                    <ExpandableText text={blog.summary} />
                  </div>

                  <div className="hidden">
                    <div dangerouslySetInnerHTML={{ __html: blog.summary }} />
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      <FaCircleUser className="text-xs text-[#d1182b]" />
                      <span className="text-xs font-semibold px-1">
                        خانه عکاسان افرنگ
                      </span>
                    </div>
                    <div className="text-xs font-semibold">
                      {formatPersianDate(blog.created)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <BlogPagination blogs={blogs} searchParams={searchParams} />
        {blogs.length === 0 && <EmptyBlogs />}
      </Container>
    </>
  );
}

export default BoxImgBlog;
