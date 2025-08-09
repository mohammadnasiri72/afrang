import { Empty, Popover } from "antd";
import { HiDotsVertical } from "react-icons/hi";
import EditeProductSec from "./EditeProductSec";
import ModalDeleteBuy from "./ModalDeleteBuy";
import ModalShowDetailsBuy from "./ModalShowDetailsBuy";
import { MdDone, MdOutlineTimer } from "react-icons/md";
import { useRouter } from "next/navigation";

function ListProductBuy({
  productsSec,
}) {
  

    const router = useRouter();

  return (
    <>
      <div className="flex justify-between items-center sm:px-4 px-1 pt-4">
        <h3 className="sm:text-xl font-semibold text-gray-800 line-clamp-1">
          آگهی های خرید شما
        </h3>
        <button
          onClick={() => {
           router.push("/profile/second-hand/add");
          }}
          className="sm:px-4 px-2 sm:py-2 py-1 whitespace-nowrap text-sm bg-[#d1182b] text-white rounded-md transition-colors min-w-[90px] cursor-pointer hover:bg-[#b91626]"
        >
          ثبت آگهی جدید
        </button>
      </div>
      <div className="overflow-hidden py-8 w-full">
        <div className="w-full max-w-5xl mx-auto ">
          {   productsSec.length > 0 ? (
            <div className="flex flex-wrap gap-2 w-full sm:justify-start justify-center">
              {[...productsSec].map((pr) => (
                <div
                  key={pr.id}
                  data-id={pr.id}
                  className="relative flex  items-center gap-4 bg-white rounded-xl shadow p-3 w-full max-w-xs min-h-[80px]"
                >
                 
                  <img
                    src={"/public/images/icons/photo.png"}
                    alt={pr.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0 bg-gray-300"
                  />
                 
                  <div className="flex flex-col items-start gap-1 w-full">
                    <div className="w-full flex items-center justify-between">

                    <span className="font-bold text-base truncate line-clamp-1">
                      {pr.title}
                    </span>
                     <div className="">
                    <Popover
                      placement="bottom"
                      content={
                        <>
                          <div className="flex flex-col gap-2 w-full">
                            <ModalShowDetailsBuy id={pr.id} />
                            <EditeProductSec
                              id={pr.id}
                            />
                            <ModalDeleteBuy id={pr.id} />
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
                    <span className="text-gray-500 text-sm font-semibold">
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
                    </span>
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

export default ListProductBuy;
