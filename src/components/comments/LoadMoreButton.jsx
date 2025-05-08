"use client";

function LoadMoreButton({ loading, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center cursor-pointer group mt-3 pr-20 pb-5"
    >
      <span className="group-hover:text-[#18d1be] text-[#40768c] duration-300 font-semibold">
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-[#18d1be] border-t-transparent rounded-full animate-spin"></div>
            <span>در حال بارگذاری...</span>
          </div>
        ) : (
          "نمایش بیشتر"
        )}
      </span>
      {!loading && (
        <img
          className="-translate-x-1 group-hover:translate-x-0 duration-300"
          src="/images/icons/Arrow-Left.png"
          alt=""
        />
      )}
    </div>
  );
}

export default LoadMoreButton; 