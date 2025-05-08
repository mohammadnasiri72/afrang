import { getBlogsId } from "@/services/blogs/blogServiceId";
import { FaCalendarAlt } from "react-icons/fa";
import {
  FaComments,
  FaHeart,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import CommentSection from "../comments/CommentSection";

async function BlogDesc({ id, comments, totalCount }) {
  const { items: blog } = await getBlogsId(id);

  return (
    <>
      <div className="lg:w-3/4 w-full p-2">
        <div className="bg-white p-4 rounded-lg">
          <h2 className="font-semibold text-[25px]">
            {blog.length > 0 ? blog[0].title : ""}
          </h2>
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="flex items-center">
              <FaCalendarAlt className="text-[#40768c]" />
              <span className="px-1 text-[#40768caa]">
                {blog.length > 0 ? blog[0].dateProduct : ""}
              </span>
            </div>
            <div className="flex items-center">
              <FaUser className="text-[#40768c]" />
              <span className="px-1 text-[#40768caa]">
                منتشر شده توسط :{" "}
                <span>{blog.length > 0 ? blog[0].producer : ""}</span>
              </span>
            </div>
            <div className="flex items-center">
              <FaComments className="text-[#40768c]" />
              <span className="px-1 text-[#40768caa]">
                <span>{blog.length > 0 ? blog[0].comment : 0}</span> نظر داده
                شده
              </span>
            </div>
            <div className="flex items-center">
              <IoMdTime className="text-[#40768c]" />
              <span className="px-1 text-[#40768caa]">
                زمان خواندن این مطلب: 12 دقیقه
              </span>
            </div>
          </div>
          <div className="mt-4">
            <img
              className="w-full"
              src={blog.length > 0 ? blog[0].img : ""}
              alt={blog.length > 0 ? blog[0].title : ""}
            />
          </div>
          <div className="mt-4">
            <div dangerouslySetInnerHTML={{ __html: blog[0].body }} />
          </div>
          <hr className="mt-10 border-[#40768c55] border-[1.5px]" />
          <div className="flex justify-between items-center p-3 font-semibold">
            <div className="flex items-center">
              <FaHeart className="text-[#40768c88]" />
              <span className="px-2 text-[#18304a] ">پسندیدم</span>
              <span className="text-[#18304a]">|</span>
              <span className="px-2 text-[#18304a]">
                {" "}
                تعداد پسندیده شده ها: 435{" "}
              </span>
            </div>
            <div className="flex items-center">
              <span> اشتراک گذاری : </span>
              <div className="px-2 flex items-center gap-2">
                <FaWhatsapp className="text-xl cursor-pointer text-[#40768c88] hover:text-teal-500 duration-300" />
                <FaInstagram className="text-xl cursor-pointer text-[#40768c88] hover:text-teal-500 duration-300" />
                <FaLinkedin className="text-xl cursor-pointer text-[#40768c88] hover:text-teal-500 duration-300" />
                <FaTelegram className="text-xl cursor-pointer text-[#40768c88] hover:text-teal-500 duration-300" />
              </div>
            </div>
          </div>
        </div>

        <CommentSection id={id} comments={comments} totalCount={totalCount} />
      </div>
    </>
  );
}

export default BlogDesc;
