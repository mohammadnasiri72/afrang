export default function BoxImgHomeSkeleton() {
  return (
    <div className="max-w-[1250px] py-0 px-[10px] my-0 mx-auto text-right animate-pulse">
      <div className="mt-[-160px] !mb-[50px]">
        {/* ردیف اول */}
        <div className="flex flex-wrap">
          <div className="md:w-1/4 w-1/2 p-2">
            <div className="h-full bg-gray-200 border-2 border-gray-200 rounded-lg">
              <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/2 hidden md:block p-2">
            <div className="h-full bg-gray-200 border-2 border-gray-200 rounded-lg">
              <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          <div className="md:w-1/4 w-1/2 p-2">
            <div className="h-full bg-gray-200 border-2 border-gray-200 rounded-lg">
              <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          <div className="w-full md:hidden block p-2">
            <div className="h-full bg-gray-200 border-2 border-gray-200 rounded-lg">
              <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* ردیف دوم */}
        <div className="flex flex-wrap">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="sm:w-1/4 md:w-1/4 w-1/2 p-2">
              <div className="h-full bg-white border-2 border-gray-200 rounded-lg">
                <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 