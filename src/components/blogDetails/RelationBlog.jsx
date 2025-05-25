import { getEndBlogs } from "@/services/blogs/blogService";
import Link from "next/link";
import moment from "moment-jalaali";

async function RelationBlog() {
  const { items: blogs } = await getEndBlogs();
  
  const convertPersianToEnglish = (str) => {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    return str.split('').map(char => {
      const index = persianNumbers.indexOf(char);
      return index !== -1 ? englishNumbers[index] : char;
    }).join('');
  };

  const formatPersianDate = (dateString) => {
    try {
      // تبدیل اعداد فارسی به انگلیسی
      const englishDateString = convertPersianToEnglish(dateString);
      // تبدیل رشته تاریخ به آبجکت moment
      const [year, month, day] = englishDateString.split('/').map(Number);
      
      // ساخت تاریخ شمسی
      const date = moment()
        .jYear(year)
        .jMonth(month - 1)
        .jDate(day);
      
      // تبدیل به فرمت مورد نظر با استفاده از آرایه ماه‌های فارسی
      const persianMonths = [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
      ];
      
      return `${date.jDate()} ${persianMonths[date.jMonth()]} ${date.jYear()}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString; // در صورت خطا، تاریخ اصلی برگردانده می‌شود
    }
  };

  return (
    <>
      <div className="lg:w-1/4 w-full p-2 z-50 relative">
        <div className="bg-white p-4 rounded-lg">
          <h2 className="font-semibold text-[16px]">آخرین اخبار</h2>
          {blogs.length > 0 &&
            blogs.map((blog) => (
              <div key={blog.id} className="w-full mt-2">
                <Link
                  href={blog.url}
                  className="relative group overflow-hidden"
                >
                  <div className="overflow-hidden relative cursor-pointer flex items-center justify-center">
                    <img
                      className="group-hover:scale-105 scale-100 duration-1000 ease-out group-hover:grayscale-[0.7] filter  brightness-[0.95] w-56 h-56"
                      src={blog.img}
                      alt={blog.title}
                    />
                    <hr className="w-14 absolute top-1/2 left-full ease-out duration-500 translate-x-0 -translate-y-1/2  border-t-[1px] border-[#fff] group-hover:left-1/2 group-hover:-translate-x-1/2" />
                    <hr className="w-14 absolute -top-full left-1/2 ease-out duration-500 -translate-x-1/2 translate-y-0  border-t-[1px] border-[#fff] group-hover:top-1/2 group-hover:-translate-y-1/2 rotate-90" />
                  </div>

                  <div className="p-3 bg-white">
                    <h3 className="">
                      <span
                        className="font-bold  group-hover:text-teal-500 duration-300"
                        href="#"
                      >
                        {blog.title}
                      </span>
                    </h3>
                    <div className="">
                      <p className="text-[#000a] text-[13px]">
                        {formatPersianDate(blog.dateProduct)}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default RelationBlog;
