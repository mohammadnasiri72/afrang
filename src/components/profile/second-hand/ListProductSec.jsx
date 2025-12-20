import { getImageUrl } from "@/utils/mainDomain";
import { Empty, Popover, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { HiDotsVertical } from "react-icons/hi";
import { MdDone, MdOutlineTimer } from "react-icons/md";
import EditeProductSec from "./EditeProductSec";
import ModalDelete from "./ModalDelete";
import ModalShowDetails from "./ModalShowDetails";

function ListProductSec({ productsSec }) {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-between items-center sm:px-4 px-1 pt-4">
        <h3 className="sm:text-xl font-semibold text-gray-800">
          آگهی های فروش شما
        </h3>
        <button
          onClick={() => {
            router.push("/profile/second-hand/add");
          }}
          className="sm:px-4 px-2 sm:py-2 py-1 text-sm bg-[#d1182b] !text-white rounded-md transition-colors min-w-[90px] cursor-pointer hover:bg-[#b91626]"
        >
          ثبت آگهی جدید
        </button>
      </div>
      <div className="py-8">
        <div className="w-full max-w-5xl mx-auto">
          {productsSec.length > 0 ? (
            <div className="flex flex-wrap gap-2 w-full overflow-hidden">
              {[...productsSec].map((pr) => (
                <div
                  key={pr.id}
                  data-id={pr.id}
                  className="relative flex items-center gap-4 bg-white rounded-xl shadow p-3 w-full max-w-xs min-h-[80px]"
                >
                  {pr.image ? (
                    <img
                      src={getImageUrl(pr.image)}
                      alt={pr.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0 bg-gray-100"
                    />
                  ) : (
                    <Skeleton.Image />
                  )}
                  <div className="flex flex-col items-start flex-1 min-w-0 gap-1">
                    <div className="flex justify-between items-center w-full">
                      <span className="font-bold text-base truncate">
                        {pr.title}
                      </span>
                      <div className="">
                        <Popover
                          placement="bottom"
                          content={
                            <>
                              <div className="flex flex-col gap-2 w-full">
                                <ModalShowDetails id={pr.id} />
                                <EditeProductSec id={pr.id} />
                                <ModalDelete id={pr.id} />
                              </div>
                            </>
                          }
                          trigger="click"
                        >
                          <HiDotsVertical className="cursor-pointer text-gray-500 text-xl " />
                        </Popover>
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm truncate">
                      {pr.categoryTitle}
                    </span>
                    {pr.price !== 0 && (
                      <span className="text-[#d1182b] font-bold text-sm">
                        قیمت: {pr.price.toLocaleString()} تومان
                      </span>
                    )}
                    {pr.price === 0 && (
                      <span className="text-[#d1182b] font-bold text-sm">
                        توافقی (تماس بگیرید)
                      </span>
                    )}
                    {pr.isActive ? (
                      <span className="text-emerald-600 flex items-center gap-1 bg-emerald-100 rounded-lg px-3">
                        <MdDone />
                        <span>تایید شده</span>
                      </span>
                    ) : (
                      <span className="text-amber-600 flex items-center gap-1 bg-amber-100 rounded-lg px-3">
                        <MdOutlineTimer />
                        <span>منتظر تایید</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-5 rounded-lg z-50 relative w-full">
              <div className=" gap-4 flex justify-center items-center h-full">
                <Empty
                  description="در حال حاضر هیچ آگهی فروشی برای شما ثبت نشده است"
                  className="my-8"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ListProductSec;
