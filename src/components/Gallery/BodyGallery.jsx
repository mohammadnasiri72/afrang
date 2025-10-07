"use client";

import { itemVisit } from "@/services/Item/item";
import { postLike } from "@/services/UserActivity/UserActivityService";
import { getUserCookie } from "@/utils/cookieUtils";
import { getImageUrl } from "@/utils/mainDomain";
import {
  Divider,
  Empty,
  message,
  Pagination,
  Rate,
  Skeleton,
  Spin,
} from "antd";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { FaEye, FaRegUser, FaTelegram } from "react-icons/fa6";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { LuCalendarRange } from "react-icons/lu";
import Container from "../container";
import BoxImageGallery from "./BoxImageGallery";

// import required modules
import { getPropertyItem } from "@/services/Property/propertyService";
import { getGallery } from "@/services/gallery/galleryServices";
import { Fancybox } from "@fancyapps/ui";
import Link from "next/link";
import Loading from "../Loading";

Fancybox.defaults.Keyboard = {
  Escape: "close", // کلید ESC گالری را ببندد
  ArrowRight: "next", // کلید پیکان راست به تصویر بعدی برود
  ArrowLeft: "prev", // کلید پیکان چپ به تصویر قبلی برود
};

Fancybox.bind("[data-fancybox='gallery']", {
  Animation: {
    duration: 500, // مدت زمان انیمیشن
    easing: "cubic-bezier(0.25, 0.1, 0.25, 1)", // انیمیشن نرم
  },

  Toolbar: true,
  Buttons: true,
  Thumbs: {
    autoStart: true, // شروع خودکار نمایش تصاویر کوچک
  },
  dragToClose: true, // امکان کشیدن تصویر برای بستن
});

function BodyGallery({ ImagesDataCurrent }) {
  const [ImagesData, setImagesData] = useState(ImagesDataCurrent);
  const [liked, setLiked] = useState(false);
  const [likedNumber, setLikedNumber] = useState(0);
  const [imgSelected, setImgSelected] = useState(ImagesDataCurrent[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageImages, setNextPageImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMain, setLoadingMain] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageIds, setImageIds] = useState("");
  const [listProperty, setListProperty] = useState([]);
  const [propertySelected, setPropertySelected] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (imgSelected) {
      setLiked(imgSelected.isLiked);
      setLikedNumber(imgSelected.like);
    }
  }, [imgSelected]);

  useEffect(() => {
    if (listProperty.length > 0 && imgSelected?.id) {
      setPropertySelected(
        listProperty.filter((item) => item.itemId === imgSelected.id)
      );
    }
  }, [listProperty, imgSelected]);

  const fetchPropertyItem = async () => {
    try {
      const response = await getPropertyItem(imageIds);
      setListProperty(response);
    } catch (error) {
      message.error({
        content: error.message || "خطای شبکه",
        duration: 3,
      });
    }
  };

  useEffect(() => {
    if (imageIds) {
      fetchPropertyItem();
    }
  }, [imageIds]);

  const handleImageVisit = async (id) => {
    const url = window.location.href;
    const userAgent = navigator.userAgent;

    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      const ip = data.ip;
      itemVisit(id, url, ip, userAgent);
    } catch (error) {
      console.error("Error fetching IP:", error);
    }
  };

  useEffect(() => {
    const userData = getUserCookie();
    setToken(userData?.token || null);
  }, []);

  useEffect(() => {
    if (token && imgSelected) {
      handleImageVisit(imgSelected.id);
    }
  }, [token, imgSelected]);

  const handleLike = async () => {
    if (!token) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      const response = await postLike(imgSelected.id, token);
      setLiked(!liked);
      setLikedNumber((e) => (liked ? e - 1 : e + 1));
      message.success({
        content: liked
          ? "تصویر از علاقه‌مندی‌ها حذف شد"
          : "تصویر به علاقه‌مندی‌ها اضافه شد",
        duration: 3,
        className: "custom-success-message",
      });
    } catch (error) {
      message.error({
        content: error.response?.data || "خطای شبکه",
        duration: 3,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const orderByParam = searchParams.get("orderBy");

  useEffect(() => {
    if (ImagesData.length > 0) {
      fetchNextPage(2); // لود کردن صفحه دوم در ابتدا
    }
  }, [ImagesData]);

  const fetchNextPage = async (page) => {
    try {
      setLoading(true);
      const paramsData = {
        LangCode: "fa",
        PageSize: 16,
        PageIndex: page,
      };

      if (params?.slug?.[0]) {
        paramsData.CategoryIdArray = Number(params.slug[0]);
      }

      if (!orderByParam || orderByParam === "10") {
        paramsData.OrderBy = 10;
      } else {
        paramsData.OrderBy = Number(orderByParam);
      }

      const nextPageData = await getGallery(paramsData);

      if (nextPageData && nextPageData.length > 0) {
        setNextPageImages(nextPageData);
        if (nextPageData[0]?.total) {
          setTotalItems(nextPageData[0].total);
        }
      }
    } catch (error) {
      console.error("Error fetching next page:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setNextPageImages([]);

    // ساخت URL جدید با پارامترهای جستجو
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", page);

    // آپدیت URL بدون رفرش صفحه
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", newUrl);

    fetchNextPage(page + 1);
  };

  // اضافه کردن useEffect برای خواندن پارامتر page از URL در لود اولیه
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pageParam = searchParams.get("page");
    if (pageParam) {
      setCurrentPage(Number(pageParam));
      fetchNextPage(Number(pageParam) + 1);
    }
  }, []);

  const fetchCurrentPage = async () => {
    try {
      setLoadingMain(true);
      const paramsData = {
        LangCode: "fa",
        PageSize: 16,
        PageIndex: 1,
      };

      if (params?.slug?.[0]) {
        paramsData.CategoryIdArray = Number(params.slug[0]);
      }

      if (!orderByParam || orderByParam === "10") {
        paramsData.OrderBy = 10;
      } else {
        paramsData.OrderBy = Number(orderByParam);
      }

      const currentPageData = await getGallery(paramsData);

      if (currentPageData && currentPageData.length > 0) {
        setImagesData(currentPageData);
        setImgSelected(currentPageData[0]);
        const ids = currentPageData.map((item) => item.id).join(",");
        setImageIds(ids);
      } else {
        setImagesData([]);
        setImgSelected(null);
        setTotalItems(0);
        setImageIds("");
      }
    } catch (error) {
      console.error("Error fetching current page:", error);
    } finally {
      setLoadingMain(false);
    }
  };

  useEffect(() => {
    if (params?.slug?.[0] || orderByParam) {
      fetchCurrentPage();
    }
  }, [params?.slug?.[0], orderByParam]);

  const handleNext = () => {
    const currentIndex = ImagesData.findIndex(
      (obj) => obj.id === imgSelected.id
    );
    const nextIndex = (currentIndex + 1) % ImagesData.length;
    setImgSelected(ImagesData[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = ImagesData.findIndex(
      (obj) => obj.id === imgSelected.id
    );
    const prevIndex =
      (currentIndex - 1 + ImagesData.length) % ImagesData.length;
    setImgSelected(ImagesData[prevIndex]);
  };

  return (
    <>
      <Container>
        <div className="flex lg:flex-nowrap flex-wrap gap-3">
          {loadingMain ? (
            <div className="rounded-sm bg-white p-4 flex items-center lg:w-5/12 w-full">
              <Skeleton.Image active className="!w-full !h-[400px]" />
            </div>
          ) : ImagesData?.length > 0 ? (
            <div className="rounded-sm bg-white p-4 flex items-center lg:w-5/12 w-full">
              {ImagesData?.map((item) => (
                <a
                  key={item.id}
                  className={item.id === imgSelected?.id ? "w-full" : "hidden"}
                  href={getImageUrl(item.image)}
                  data-fancybox="gallery"
                  data-caption={item.senderTitle}
                >
                  <div className="relative w-full h-[400px]">
                    <Image
                      src={getImageUrl(item.image)}
                      alt={item.senderTitle}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="rounded-sm bg-white p-4 flex items-center justify-center lg:w-5/12 w-full min-h-[400px]">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="تصویری یافت نشد"
              />
            </div>
          )}
          <div className="rounded-sm bg-white p-4  lg:w-7/12 w-full relative">
            {loadingMain ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Skeleton.Avatar active size="large" />
                  <Skeleton.Input active size="large" className="w-3/4" />
                </div>
                <Skeleton.Input active size="default" className="w-1/2" />
                <div className="flex items-center gap-2">
                  <Skeleton.Input active size="small" className="w-1/4" />
                  <Skeleton.Input active size="small" className="w-1/4" />
                </div>
              </div>
            ) : ImagesData?.length > 0 ? (
              <>
                <div className="flex flex-wrap sm:flex-nowrap justify-between px-2 items-center sm:mt-3 mt-0 sm:flex-row flex-col-reverse">
                  <h3 className="flex font-semibold text-[20px] sm:w-auto w-full sm:justify-start justify-center text-center sm:mt-0 mt-3">
                    عکس های برتر بر اساس لایک کاربران
                  </h3>
                  <div
                    onClick={handleLike}
                    className="bg-[#d1182b] rounded-sm px-3 py-1 flex items-center !text-white cursor-pointer mr-auto sm:mr-0"
                  >
                    {isLoading ? (
                      <Spin size="small" />
                    ) : (
                      <>
                        {liked ? (
                          <IoMdHeart className="text-lg" />
                        ) : (
                          <IoMdHeartEmpty className="text-lg" />
                        )}
                        <span className="text-xl font-semibold pr-1">
                          {likedNumber}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex sm:flex-row flex-col justify-center sm:justify-start sm:gap-3 gap-0 items-center sm:flex-nowrap flex-wrap mt-5">
                  <img className="w-10" src="/images/logo.png" alt="" />
                  <span className="font-semibold text-lg sm:py-0 py-4">
                    امتیاز تیم افرنگ به این عکس :
                  </span>
                  <Rate
                    disabled
                    allowHalf
                    style={{ direction: "ltr", color: "#18d1be" }}
                    value={
                      (Number(
                        propertySelected.find(
                          (item) => item.propertyKey === "gal_afrangscore"
                        )?.value
                      ) || 0) / 2
                    }
                  />
                </div>
                <div className="flex flex-wrap sm:flex-nowrap items-center mt-5 gap-7">
                  <div className="flex items-center gap-2 sm:w-auto w-full">
                    <FaEye className="text-[#444]" />
                    <span className="text-[#444]">بازدیدکنندگان :</span>
                    <span className="font-semibold text-[16px]">
                      {" "}
                      {imgSelected?.visit || 0} نفر{" "}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:w-auto w-full">
                    <FaRegUser className="text-[#444]" />
                    <span className="text-[#444]">فرستنده :</span>
                    <span className="font-semibold text-[16px]">
                      {" "}
                      {imgSelected?.senderTitle || "نامشخص"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:w-auto w-full">
                    <LuCalendarRange className="text-[#444]" />
                    <span className="text-[#444]">زمان عکاسی :</span>
                    <span className="font-semibold text-[16px]">
                      {propertySelected.find(
                        (item) => item.propertyKey === "gal_time"
                      )?.value || "نامشخص"}
                    </span>
                  </div>
                </div>
                <div className="mt-10 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-[#312e42] text-[14px]">
                      دسته‌بندی :
                    </span>
                    <span className="font-bold">
                      {imgSelected?.categoryTitle || "نامشخص"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[#312e42] text-[14px]">
                      نوع دوربین :
                    </span>
                    <span className="font-bold">
                      {propertySelected.find(
                        (item) => item.propertyKey === "gal_camera"
                      )?.value || "نامشخص"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[#312e42] text-[14px]">
                      نوع لنز :
                    </span>
                    <span className="font-bold">
                      {propertySelected.find(
                        (item) => item.propertyKey === "gal_lenz"
                      )?.value || "نامشخص"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap sm:flex-nowrap justify-between px-2 items-center mt-10">
                  <div className="flex items-center gap-3 sm:w-auto w-full sm:justify-start justify-between">
                    <div
                      onClick={handleLike}
                      className="flex items-center rounded-sm bg-[#f9e3e5] text-[#d1182b] px-3 py-3 cursor-pointer duration-300 hover:bg-[#d1182b] hover:text-[#fff]"
                    >
                      {isLoading ? (
                        <Spin size="small" />
                      ) : (
                        <>
                          {liked ? (
                            <IoMdHeart className="text-lg" />
                          ) : (
                            <IoMdHeartEmpty className="text-lg" />
                          )}
                          <span className="whitespace-nowrap pr-1 font-bold text-sm">
                            لایک
                          </span>
                        </>
                      )}
                    </div>
                    <Link
                      href={"/profile/Send-Photo"}
                      onClick={(e) => {
                        e.preventDefault();

                        startTransition(() => {
                          router.push("/profile/Send-Photo");
                        });
                      }}
                    >
                      <div className="flex items-center rounded-sm bg-[#18d1be] !text-white px-3 py-3 cursor-pointer duration-300 hover:bg-[#40768c]">
                        <FaTelegram className="text-lg" />
                        <span className="whitespace-nowrap pr-2 font-semibold text-sm">
                          ارسال تصویر
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="flex gap-3 items-center sm:w-auto w-full sm:mt-0 mt-5 sm:justify-start justify-between">
                    <div
                      onClick={handlePrev}
                      className="bg-[#f9e3e5] p-3 rounded-sm cursor-pointer -rotate-90 hover:bg-[#b6ede8] duration-300"
                    >
                      <img src="/images/icons/Arrow-Down.png" alt="" />
                    </div>
                    <div
                      onClick={handleNext}
                      className="bg-[#f9e3e5] p-3 rounded-sm cursor-pointer rotate-90 hover:bg-[#b6ede8] duration-300"
                    >
                      <img src="/images/icons/Arrow-Down.png" alt="" />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center min-h-[400px]">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="اطلاعاتی برای نمایش وجود ندارد"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap">
          {loadingMain ? (
            Array(16)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="lg:w-[12.5%] md:w-1/6 sm:w-1/3 w-1/2 p-2"
                >
                  <Skeleton.Image active className="!w-full !h-[150px]" />
                </div>
              ))
          ) : ImagesData?.length > 0 ? (
            ImagesData?.map((item) => (
              <div
                key={item.id}
                className="lg:w-[12.5%] md:w-1/6 sm:w-1/3 w-1/2 p-2"
              >
                <div
                  onClick={() => {
                    setImgSelected(item);
                  }}
                  className={`bg-white rounded-sm border-4 shadow-lg cursor-pointer ${
                    imgSelected?.id === item.id
                      ? "border-[#d1182b]"
                      : "border-white"
                  }`}
                >
                  <div className="relative w-full h-[150px]">
                    <Image
                      src={getImageUrl(item.image)}
                      alt={item.senderTitle}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full p-4">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="تصویری یافت نشد"
              />
            </div>
          )}
        </div>
        {totalItems > 0 && (
          <div className="sm:px-4 mt-20">
            <div className="sm:hidden flex justify-center items-center pb-10">
              <div className="sm:hidden flex items-center title-newProduct relative">
                <h2 className="font-semibold text-xl">
                  تصاویری که بیشترین لایک را داشته اند
                </h2>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="sm:flex hidden items-center title-newProduct relative">
                <h2 className="font-semibold text-xl">
                  تصاویری که بیشترین لایک را داشته اند
                </h2>
              </div>
            </div>
          </div>
        )}
        {totalItems > 0 && (
          <div className="flex flex-wrap mt-10">
            {loading ? (
              <div className="w-full flex flex-wrap">
                {Array(8)
                  .fill(null)
                  .map((_, index) => (
                    <div
                      key={`skeleton-${index}`}
                      className="lg:w-1/4 sm:w-1/2 w-full p-2"
                    >
                      <div className="bg-white p-2 rounded-sm box-circl z-50 relative">
                        <div className="cursor-pointer relative overflow-hidden">
                          <div className="block relative w-full h-[200px]">
                            <Skeleton.Image
                              active
                              className="w-full h-full !w-full !h-full"
                            />
                          </div>
                        </div>
                        <div className="my-3 flex items-center text-xs p-2">
                          <Skeleton.Input
                            active
                            size="small"
                            style={{ width: 100 }}
                          />
                        </div>
                        <Divider
                          style={{
                            margin: 0,
                            padding: 0,
                            borderColor: "#d1182b55",
                          }}
                        />
                        <div className="flex justify-between items-center px-1 py-2 mt-2">
                          <Skeleton.Input
                            active
                            size="small"
                            style={{ width: 60 }}
                          />
                          <Skeleton.Input
                            active
                            size="small"
                            style={{ width: 40 }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              nextPageImages.length > 0 &&
              nextPageImages.map((item) => (
                <BoxImageGallery
                  key={`next-${item.id}`}
                  imageData={item}
                  data-image-id={item.id}
                />
              ))
            )}
            <div
              dir="ltr"
              className="w-full flex justify-center mt-8 z-50 relative"
            >
              <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={16}
                onChange={handlePageChange}
                showSizeChanger={false}
                itemRender={(page, type, originalElement) => {
                  if (type === "page") {
                    const searchParams = new URLSearchParams(
                      window.location.search
                    );
                    searchParams.set("page", page);
                    return (
                      <Link
                        href={`${
                          window.location.pathname
                        }?${searchParams.toString()}`}
                        onClick={(e) => {
                          e.preventDefault();

                          startTransition(() => {
                            router.push(
                              `${
                                window.location.pathname
                              }?${searchParams.toString()}`
                            );
                          });
                        }}
                      >
                        {page}
                      </Link>
                    );
                  }
                  return originalElement;
                }}
              />
            </div>
          </div>
        )}
      </Container>

      {isPending && <Loading />}
    </>
  );
}

export default BodyGallery;
