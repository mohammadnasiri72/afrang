import { getItem } from "@/services/Item/item";
import { getImageUrl } from "@/utils/mainDomain";

export default async function BoxImgHome() {

  const mainBanner = await getItem({
    TypeId: 1015,
    LangCode: 'fa',
    CategoryIdArray: "3293",
  });

  

  return (
    <>
      <div className="max-w-[1250px] py-0 px-[10px] my-0 mx-auto text-right">
        <div className="mt-[-160px] mb-[10px]">
          <div className="flex flex-wrap">
            <div className="md:w-1/4 w-1/2 p-2">
              <div className="h-full bg-white border-2 border-gray-200 rounded-lg">
                <a href="#" className="block w-full">
                  <img
                    className="w-full min-h-[50px] object-contain"
                    src={getImageUrl(mainBanner[0]?.image)}
                    alt={mainBanner[0]?.categoryTitle}
                  />
                </a>
              </div>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/2 hidden md:block p-2">
              <div className="h-full bg-white border-2 border-gray-200 rounded-lg">
                <a href="#" className="block w-full">
                  <img
                    className="w-full min-h-[50px] object-contain"
                    src={getImageUrl(mainBanner[1]?.image)}
                      alt={mainBanner[1]?.categoryTitle}
                  />
                </a>
              </div>
            </div>

            <div className="md:w-1/4 w-1/2 p-2">
              <div className="h-full bg-white border-2 border-gray-200 rounded-lg">
                <a href="#" className="block w-full">
                  <img
                    className="w-full min-h-[50px] object-contain"
                    src={getImageUrl(mainBanner[2]?.image)}
                    alt={mainBanner[2]?.categoryTitle}
                  />
                </a>
              </div>
            </div>

            <div className="w-full md:hidden block">
              <div className="h-full bg-white border-2 border-gray-200 rounded-lg">
                <a href="#">
                  <img
                    className="w-full h-full min-h-[50px] object-cover"
                    src={getImageUrl(mainBanner[1]?.image)}
                    alt={mainBanner[1]?.categoryTitle}
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="sm:w-1/4 md:w-1/4 w-1/2 p-2">
              <div className="h-full bg-white border-2 border-gray-200 rounded-lg">
                <a href="#" className="block w-full">
                  <img
                    className="w-full min-h-[50px] object-contain"
                    src={getImageUrl(mainBanner[3]?.image)}
                    alt={mainBanner[3]?.categoryTitle}
                  />
                </a>
              </div>
            </div>

            <div className="sm:w-1/4 md:w-1/4 w-1/2 p-2">
              <div className="h-full bg-white border-2 border-gray-200 rounded-lg">
                <a href="#" className="block w-full">
                  <img
                    className="w-full min-h-[50px] object-contain"
                    src={getImageUrl(mainBanner[4]?.image)}
                    alt={mainBanner[4]?.categoryTitle}
                  />
                </a>
              </div>
            </div>

            <div className="sm:w-1/4 md:w-1/4 w-1/2 p-2">
              <div className="h-full bg-white border-2 border-gray-200 rounded-lg">
                <a href="#" className="block w-full">
                  <img
                    className="w-full min-h-[50px] object-contain"
                    src={getImageUrl(mainBanner[5]?.image)}
                    alt={mainBanner[5]?.categoryTitle}
                  />
                </a>
              </div>
            </div>

            <div className="sm:w-1/4 md:w-1/4 w-1/2 p-2">
              <div className="h-full bg-white border-2 border-gray-200 rounded-lg">
                <a href="#" className="block w-full">
                  <img
                    className="w-full min-h-[50px] object-contain"
                    src={getImageUrl(mainBanner[6]?.image)}
                    alt={mainBanner[6]?.categoryTitle}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
