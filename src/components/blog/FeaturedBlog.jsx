import { getItem } from "@/services/Item/item";
import moment from "moment-jalaali";
import { FaUserCircle } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa6";

async function FeaturedBlog() {



   



     // تابع برای حذف تگ‌های HTML
  const stripHtmlTags = (html) => {
    if (!html || typeof html !== 'string') return "";
    try {
        if (typeof document !== "undefined") {
            const doc = new DOMParser().parseFromString(html, "text/html");
            return doc.body.textContent || "";
        }
        return html.replace(/<[^>]*>/g, "");
    } catch (error) {
        console.error("Error stripping HTML:", error);
        return "";
    }
  };

  const formatPersianDate = (dateString) => {
    try {
      const persianMonths = [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
      ];

      const date = moment(dateString);
      const day = date.jDate();
      const month = persianMonths[date.jMonth()];
      const year = date.jYear();

      return `${day} ${month} ${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };


   // دریافت مقالات
   let blogs;
   try {
     blogs = await getItem({
       TypeId: 5,
       LangCode: "fa",
       PageSize: 1,
       PageIndex: 1,
       
     });
   } catch (error) {
     console.error('Error fetching blogs:', error);
     throw new Error('خطا در دریافت مقالات. لطفا دوباره تلاش کنید.');
   }

  



  return (
    <>
     {blogs.length > 0 && (
          <div>
            <div className="flex flex-wrap bg-white p-5 rounded-lg overflow-hidden items-start">
              <div className="lg:w-1/3 w-full py-3 px-5">
                <h3 className="text-2xl font-semibold">{blogs[0].title}</h3>
                <p className="leading-[45px]  text-[17px] text-[#666] mt-2 text-justify">
                  {stripHtmlTags(blogs[0].summary)}
                </p>
                <div className="flex items-center mt-8">
                  <FaUserCircle className="text-[#d1182b] text-lg" />
                  <span className="px-1 text-[17px] font-semibold">
                    خانه عکاسان افرنگ
                  </span>
                </div>
                <div className="flex items-center mt-6">
                  <FaCalendar className="text-[#d1182b] text-lg" />
                  <span className="px-1 text-[17px] font-semibold">
                    {formatPersianDate(blogs[0].created)}
                  </span>
                </div>
              </div>
              <div className="lg:w-2/3 w-full relative cursor-pointer group overflow-hidden rounded-lg flex items-center justify-center">
                <img
                  src={blogs[0].img || '/images/gallery/blog-img1.jpg'}
                  alt={blogs[0].title}
                  className="group-hover:scale-105 scale-100 duration-300 group-hover:grayscale-[0.7] filter  brightness-[0.95] object-cover w-full h-full object-contain overflow-hidden"
                />
                <hr className="w-14 absolute top-1/2 left-full ease-out duration-300 translate-x-0 -translate-y-1/2  border-[1.5px] border-[#fff] group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:opacity-100 opacity-0" />
                <hr className="w-14 absolute -top-full left-1/2 ease-out duration-300 -translate-x-1/2 translate-y-0  border-[1.5px] border-[#fff] group-hover:top-1/2 group-hover:-translate-y-1/2 rotate-90" />
              
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default FeaturedBlog