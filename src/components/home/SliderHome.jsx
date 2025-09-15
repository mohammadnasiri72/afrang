"use client";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { mainDomainImg } from "@/utils/mainDomain";
import Link from "next/link";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const SliderHome = ({ sliderItems }) => {
  return (
    <div className="relative w-full h-64 slider-homePage">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-bullet",
          bulletActiveClass:
            "swiper-pagination-bullet-active custom-bullet-active",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-full"
      >
        {sliderItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="block w-full h-full">
              <div className="relative w-full h-full cursor-pointer group">
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-300"
                  style={{
                    backgroundImage: `url(${mainDomainImg}${item.image})`,
                  }}
                >
                  {item.sourceLink && item.sourceLink !== "/" && (
                    <div className="flex justify-center absolute top-4/5 left-1/2 transform -translate-x-1/2 z-[100000000000000]">
                      <Link href={item.sourceLink}>
                        <button
                          tabIndex={-1}
                          className="bg-[#18d1be] rounded-2xl py-1.5 duration-300 hover:bg-white hover:text-[#d1182b] cursor-pointer text-[#444] font-bold px-3"
                        >
                          نمایش بیشتر
                        </button>
                      </Link>
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 bg-[#0002] bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderHome;

// <div
//   className={`slider-container h-64 overflow-hidden ${
//     isDragging ? "dragging" : ""
//   }`}
//   onMouseDown={handleMouseDown}
//   onMouseUp={handleMouseUp}
//   tabIndex={0}
// >
//   <Slider {...settings}>
//     {sliderItems.map((item) => (
//       <div className="relative " key={item.id}>
//         {/* <div className="w-full">
//           <img
//             className="h-64 w-full object-cover"
//             src={`${mainDomainImg}${item.image}`}
//             alt={item.title}
//           />
//         </div> */}
//         <div className="w-full">
//           <Image
//             src={`${mainDomainImg}${item.image}`}
//             alt={item.title}
//             width={800} // عرض واقعی تصویر
//             height={256} // ارتفاع واقعی تصویر (متناسب با h-64)
//             className="w-full object-cover"
//             style={{ height: "256px" }} // یا می‌توانید از min-h برای ارتفاع استفاده کنید
//             priority={true} // اگر این تصویر جزو اولین تصاویر صفحه است
//             loading="eager" // بارگذاری فوری بدون lazy loading
//             quality={75} // کیفیت تصویر (75% تعادل خوبی دارد)
//             placeholder="blur" // برای effect loading بهتر
//             blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9kfa+ODhJpWlvYWA==" // یک placeholder ساده
//           />
//         </div>
//         {item.sourceLink && item.sourceLink !== "/" ? (
//           <div className="flex justify-center absolute top-4/5 left-1/2 transform -translate-x-1/2">
//             <Link href={item.sourceLink}>
//               <button
//                 tabIndex={-1}
//                 className="bg-[#18d1be] rounded-2xl py-1.5 duration-300 hover:bg-white hover:text-[#d1182b] cursor-pointer text-[#444] font-bold px-3"
//               >
//                 نمایش بیشتر
//               </button>
//             </Link>
//           </div>
//         ) : null}
//       </div>
//     ))}
//   </Slider>
// </div>
