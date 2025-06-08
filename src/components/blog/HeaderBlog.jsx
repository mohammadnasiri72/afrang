import { FaUserCircle } from "react-icons/fa";
import { FaCalendar, FaStar } from "react-icons/fa6";
import Container from "../container";
import SelectCategory from "./SelectCategory";
import SelectOrder from "./SelectOrder";
import moment from "moment-jalaali";

async function HeaderBlog({ searchParams, category, blogs }) {

  


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


  return (
    <>
      <Container>
        <div className="rounded-[5px] bg-white py-[10px] px-[15px] my-[25px] flex items-center">
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 w-full h-full ">
            <div className="align-middle w-full">
              <h2 className="text-[20px] font-semibold whitespace-nowrap">
                اخبار و مقالات
                <span className="text-[#d1182b] px-1">افرنگ</span>
              </h2>
            </div>
            <div className="flex items-center w-full gap-4 flex-wrap md:flex-nowrap">
              {/* <div className="sm:hidden flex w-full">
                <div className="w-1/2 px-3">
                  <ModalSelectCategoryBlog />
                </div>
                <div className="w-1/2 px-3">
                  <ModalSelectSortBlog />
                </div>
              </div> */}
              {/* <SubCategory /> */}

              <SelectOrder value={searchParams?.orderBy || 1} />

              <SelectCategory category={category} />
            </div>
          </div>
        </div>
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
                {/* <div className="absolute text-white bg-[#d1182b] top-0 left-0 px-2 py-2 rounded-br-2xl font-bold  flex items-center">
                  <span className="text-xl px-1">2.4</span>
                  <FaStar />
                </div> */}
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

export default HeaderBlog;
