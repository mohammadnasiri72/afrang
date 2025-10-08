import { getItem } from "@/services/Item/item";
import { getImageUrl } from "@/utils/mainDomain";
import moment from "moment-jalaali";
import Image from "next/image";
import Link from "next/link";

async function RelationBlog() {
  const blogs = await getItem({
    TypeId: 5,
    LangCode: "fa",
    PageSize: 3,
    PageIndex: 1
  });

  

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
      <div className="lg:w-1/4 w-full p-2 z-50 relative">
        <div className="bg-white p-4 rounded-lg">
          <h2 className="font-semibold text-[16px]">آخرین اخبار</h2>
          {blogs.length > 0 &&
            blogs.map((blog) => (
              <div key={blog.id} className="w-full mt-2 ">
                <Link
                  href={blog.url}
                  className="relative group overflow-hidden "
                >
                  <div className="overflow-hidden w-full aspect-[16/9]  relative cursor-pointer flex items-center justify-center">
                    <Image
                      className="group-hover:scale-105  scale-100 duration-1000 ease-out group-hover:grayscale-[0.7] filter brightness-[0.95] object-contain"
                      src={getImageUrl(blog.image) || "/images/blog-img1.jpg"}
                      alt={blog.title}
                      width={224}
                      height={224}
                      
                    />
                    <hr className="w-14 absolute top-1/2 left-full ease-out duration-500 translate-x-0 -translate-y-1/2  border-t-[1px] border-[#fff] group-hover:left-1/2 group-hover:-translate-x-1/2" />
                    <hr className="w-14 absolute -top-full left-1/2 ease-out duration-500 -translate-x-1/2 translate-y-0  border-t-[1px] border-[#fff] group-hover:top-1/2 group-hover:-translate-y-1/2 rotate-90" />
                  </div>

                  <div className="p-3 bg-white">
                    <h3>
                      <span
                        className="font-bold  group-hover:text-teal-500 duration-300 text-justify"
                      >
                        {blog.title}
                      </span>
                    </h3>
                    <div className="">
                      <p className="text-[#000a] text-[13px] text-justify">
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
