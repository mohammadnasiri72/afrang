import { getItemByUrl, itemVisit } from "@/services/Item/item";
import { getImageUrl } from "@/utils/mainDomain";
import moment from "moment-jalaali";
import { headers } from "next/headers";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import { FaComments, FaUser } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import CommentSection from "../comments/CommentSection";
import LikeComponent from "./LikeComponent";
import ShareButtons from "./ShareButtons";

async function BlogDesc({ blog }) {
  // Calculate reading time based on content
  const calculateReadingTime = (content) => {
    // Remove HTML tags
    const textContent = content.replace(/<[^>]*>/g, "");
    // Count words (assuming average reading speed of 200 words per minute)
    const wordCount = textContent.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    return readingTime;
  };

  // Format date to Persian
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

  const headersList = headers();
  const ip =
    headersList.get("x-forwarded-for") ||
    headersList.get("x-real-ip") ||
    "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";
  const urlVisit = headersList.get("x-url") || headersList.get("referer") || "";

  try {
    await itemVisit(blog?.id, urlVisit, ip, userAgent);
  } catch (error) {
    console.error("Error recording visit:", error);
  }

  return (
    <>
      <div className="lg:w-3/4 w-full p-2">
        <div className="bg-white p-4 rounded-lg">
          <h2 className="font-semibold text-[25px]">{blog?.title || ""}</h2>
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="flex items-center">
              <FaCalendarAlt className="text-[#40768c]" />
              <span className="px-1 text-[#40768caa]">
                {blog?.created ? formatPersianDate(blog.created) : ""}
              </span>
            </div>
            <div className="flex items-center">
              <FaUser className="text-[#40768c]" />
              {blog?.sourceName && (
                <span className="px-1 text-[#40768caa]">
                  انتشار توسط :{" "}
                  <span>
                    {blog?.sourceName && blog?.sourceName !== "NULL"
                      ? blog?.sourceName
                      : "خانه عکاسان افرنگ"}
                  </span>
                </span>
              )}
            </div>
            <div className="flex items-center">
              <FaComments className="text-[#40768c]" />
              <span className="px-1 text-[#40768caa]">
                <span>{blog?.comment || 0}</span> نظر داده شده
              </span>
            </div>
            <div className="flex items-center">
              <IoMdTime className="text-[#40768c]" />
              <span className="px-1 text-[#40768caa]">
                زمان خواندن این مطلب:{" "}
                {blog?.body ? calculateReadingTime(blog.body) : 0} دقیقه
              </span>
            </div>
          </div>
          <div className="mt-4">
            <Image
              src={getImageUrl(blog.image) || "/images/gallery/blog-img1.jpg"}
              alt={blog?.title || ""}
              width={1200}
              height={800}
              priority
              unoptimized
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="mt-4">
            <div dangerouslySetInnerHTML={{ __html: blog?.body || "" }} />
            <div dangerouslySetInnerHTML={{ __html: blog?.summary || "" }} />
          </div>
          <hr className="mt-10 border-[#40768c55] border-[1.5px]" />
          <div className="flex flex-wrap justify-between items-center p-3 font-semibold">
            <LikeComponent blog={blog} />
            <ShareButtons blog={blog} />
          </div>
        </div>

        <CommentSection id={blog?.id} type={0} />
      </div>
    </>
  );
}

export default BlogDesc;
