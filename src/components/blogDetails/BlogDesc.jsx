import { getBlogsId } from "@/services/blogs/blogServiceId";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import {
  FaComments,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaUser,
  FaWhatsapp
} from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import CommentSection from "../comments/CommentSection";
import LikeComponent from "./LikeComponent";
import moment from "moment-jalaali";

async function BlogDesc({ id, comments, totalCount }) {
  const { items: blog } = await getBlogsId(id);

  // Calculate reading time based on content
  const calculateReadingTime = (content) => {
    // Remove HTML tags
    const textContent = content.replace(/<[^>]*>/g, '');
    // Count words (assuming average reading speed of 200 words per minute)
    const wordCount = textContent.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    return readingTime;
  };

  // Format date to Persian
  const formatPersianDate = (dateString) => {
    try {
      // Convert Persian numbers to English
      const persianToEnglish = (str) => {
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        return str.split('').map(char => {
          const index = persianNumbers.indexOf(char);
          return index !== -1 ? englishNumbers[index] : char;
        }).join('');
      };

      const [year, month, day] = dateString.split('/').map(persianToEnglish);
      
      const persianMonths = [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
      ];

      return `${day} ${persianMonths[parseInt(month) - 1]} ${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  

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
                {blog.length > 0 ? formatPersianDate(blog[0].dateProduct) : ""}
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
                زمان خواندن این مطلب: {blog.length > 0 ? calculateReadingTime(blog[0].body) : 0} دقیقه
              </span>
            </div>
          </div>
          <div className="mt-4">
            <Image
              src={blog.length > 0 ? blog[0].img : ""}
              alt={blog.length > 0 ? blog[0].title : ""}
              width={1200}
              height={800}
              priority
              unoptimized
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="mt-4">
            <div dangerouslySetInnerHTML={{ __html: blog[0].body }} />
          </div>
          <hr className="mt-10 border-[#40768c55] border-[1.5px]" />
          <div className="flex justify-between items-center p-3 font-semibold">
            
            <LikeComponent blog={blog[0]}/>
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
