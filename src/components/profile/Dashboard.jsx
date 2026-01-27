"use client";
import {
  getdataDashboard,
  getRecentViews as getRecentViewsAPI,
} from "@/services/dashboard/dashboardService";
import { getItemByIds } from "@/services/Item/item";
import { getLikes } from "@/services/UserActivity/UserActivityService";
import { getImageUrl } from "@/utils/mainDomain";
import { getRecentViews } from "@/utils/recentViews";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaBox,
  FaClipboardList,
  FaClock,
  FaRecycle,
  FaShoppingBag,
  FaTimesCircle,
  FaUser,
} from "react-icons/fa";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Page Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gray-200 animate-pulse rounded w-32" />
      </div>

      {/* Quick Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-center !mb-4">
              <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-lg" />
            </div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-24 mx-auto !mb-2" />
            <div className="h-7 bg-gray-200 animate-pulse rounded w-16 mx-auto" />
          </div>
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Views Skeleton */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="h-6 bg-gray-200 animate-pulse rounded w-32" />
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm"
                >
                  <div className="aspect-square w-full bg-gray-200 animate-pulse" />
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 !mb-2" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2 !mb-2" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Favorites & Quick Actions Skeleton */}
        <div className="space-y-6">
          {/* Favorites Skeleton */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="h-6 bg-gray-200 animate-pulse rounded w-40" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-lg" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 !mb-2" />
                      <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions Skeleton */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="h-6 bg-gray-200 animate-pulse rounded w-32 !mb-4" />
            <div className="grid grid-cols-2 gap-3">
              {[...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-5 h-5 bg-gray-200 animate-pulse rounded-full" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({
    Record: 0,
    Pending: 0,
    Process: 0,
    Done: 0,
    Cancel: 0,
  });
  const [likedItems, setLikedItems] = useState([]);
  const [recentViews, setRecentViews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = Cookies.get("user");
    const token = JSON.parse(user).token;
    const fetchListLiked = async () => {
      const response = await getLikes(5, token);

      // Transform listLiked into required format and fetch items
      if (response && response.length > 0) {
        const formattedData = {
          ids: response,
        };

        const itemsData = await getItemByIds(formattedData, token);
        setLikedItems(itemsData);
      }
    };
    fetchListLiked();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const user = Cookies.get("user");
        if (!user) {
          return;
        }

        const token = JSON.parse(user).token;

        // دریافت داده‌های داشبورد
        const data = await getdataDashboard(token);

        if (isMounted) {
          setDashboardData(data);
        }

        // دریافت لیست IDهای بازدید شده از localStorage
        const viewedIds = getRecentViews();

        if (viewedIds && viewedIds.length > 0) {
          // دریافت اطلاعات محصولات از API
          const recentViewsData = await getRecentViewsAPI(
            { ids: viewedIds },
            token
          );

          if (isMounted && Array.isArray(recentViewsData)) {
            setRecentViews(recentViewsData);
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = [
    {
      title: "ثبت شده",
      value: dashboardData?.Record?.toString() || "0",
      icon: FaClipboardList,
      color: "purple",
      change: "+12%",
      trend: "up",
      statusId: 1,
    },
    {
      title: "منتظر پردازش",
      value: dashboardData?.Pending?.toString() || "0",
      icon: FaClock,
      color: "yellow",
      change: "-3%",
      trend: "down",
      statusId: 2,
    },
    {
      title: "درحال انجام",
      value: dashboardData?.Process?.toString() || "0",
      icon: FaBox,
      color: "blue",
      change: "+8%",
      trend: "up",
      statusId: 3,
    },
    {
      title: "انجام شده",
      value: dashboardData?.Done?.toString() || "0",
      icon: FaShoppingBag,
      color: "green",
      change: "+5%",
      trend: "up",
      statusId: 4,
    },
    {
      title: "لغو شده",
      value: dashboardData?.Cancel?.toString() || "0",
      icon: FaTimesCircle,
      color: "red",
      change: "-2%",
      trend: "down",
      statusId: 5,
    },
  ];

  const handleStatClick = (statusId) => {
    router.push(`/profile/orders?statusId=${statusId}&page=1`);
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">داشبورد</h1>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
                onClick={() => handleStatClick(stat.statusId)}
              >
                <div className="flex items-center justify-center !mb-4">
                  <div className={`p-3 bg-${stat.color}-50 rounded-lg`}>
                    <Icon className={`text-${stat.color}-500 text-5xl`} />
                  </div>
                </div>
                <p className="text-gray-500 text-sm !mb-1 text-center">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-800 text-center">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Views */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm z-50 relative">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  آخرین بازدیدها
                </h3>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {Array.isArray(recentViews) && recentViews.length > 0 ? (
                  recentViews.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                    >
                      <Link href={item.url}>
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                          {item.image && (
                            <img
                              src={getImageUrl(item.image)}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </Link>
                      <div className="flex-1">
                        <Link href={item.url}>
                          <p className="font-medium text-gray-800 !mb-1 hover:text-[#d1182b] transition-colors duration-300 line-clamp-3 font-[YekanEn,sans-serif]! line-height-font-yekanEn">
                            {item.title}
                          </p>
                        </Link>

                        <div className="flex flex-col items-start justify-between gap-2">
                          <div className="text-xs text-gray-400 font-[YekanEn,sans-serif]! line-height-font-yekanEn">
                            {item.categoryTitle}
                          </div>
                          {item.conditionId === 20 && (
                            <div className="flex items-center text-sm text-[#d1182b] py-2 px-1">
                              <FaRecycle className="ml-1.5" />
                              <span className="font-semibold px-1">
                                کالای کارکرده
                              </span>
                            </div>
                          )}
                          <div className="text-sm text-gray-500">
                            {item.finalPrice > 0 ? (
                              <span className="text-[#d1182b] font-bold">
                                {item.finalPrice.toLocaleString()} تومان
                              </span>
                            ) : (
                              "تماس بگیرید"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 col-span-full">
                    هنوز محصولی بازدید نشده است
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Recent Favorites & Quick Actions */}
          <div className="space-y-6">
            {/* Favorites */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    آخرین علاقه‌مندی‌ها
                  </h3>
                  <Link
                    href="/profile/favorites"
                    className="text-sm text-[#d1182b] hover:text-[#d1182b]/80 transition-colors"
                  >
                    مشاهده همه
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {likedItems && likedItems.length > 0 ? (
                    likedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                      >
                        {item.url && (
                          <Link href={item.url}>
                            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                              {item.image && (
                                <img
                                  src={
                                    item.url.includes("product")
                                      ? getImageUrl(item.image)
                                      : getImageUrl(item.image)
                                  }
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                          </Link>
                        )}
                        <div className="flex-1">
                          {item.url && (
                            <Link href={item.url}>
                              <p className="font-medium text-gray-800 !mb-1 hover:text-[#d1182b] transition-colors duration-300 line-clamp-3 font-[YekanEn,sans-serif]! line-height-font-yekanEn" >
                                {item.title}
                              </p>
                            </Link>
                          )}

                          <div className="flex flex-col items-start justify-between gap-2">
                            <div className="text-xs text-gray-400 font-[YekanEn,sans-serif]! line-height-font-yekanEn">
                              {item.categoryTitle}
                            </div>
                          </div>
                          {item.conditionId === 20 && (
                            <div className="flex items-center text-sm text-[#d1182b] py-2 px-1">
                              <FaRecycle className="ml-1.5" />
                              <span className="font-semibold px-1">
                                کالای کارکرده
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">
                      هنوز محصولی به علاقه‌مندی‌ها اضافه نشده است
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6 z-50 relative">
              <h3 className="text-lg font-semibold text-gray-800 !mb-4">
                دسترسی سریع
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/profile/orders"
                  className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  <FaShoppingBag />
                  <span>سفارشات من</span>
                </Link>
                <Link
                  href="/profile/edit-profile"
                  className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  <FaUser />
                  <span>ویرایش پروفایل</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
