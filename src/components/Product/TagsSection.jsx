import Link from "next/link";

const TagsSection = ({ data }) => {
  return (
    <div className="px-3 pt-3 shadow-lg border border-[#0001] rounded-lg">
      <span className="font-bold! text-[#d1182b]!">محصولات مشابه</span>
      {/* تگ‌ها */}
      <div className="flex flex-wrap gap-2 py-2">
        {data.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            className="inline-flex items-center px-2 py-1 bg-white text-[#555] text-xs font-medium rounded-lg border border-gray-200 hover:bg-[#d1182b] hover:text-white hover:border-[#d1182b] transition-all duration-300 shadow-sm hover:shadow-md font-[YekanEn,sans-serif]! line-height-font-yekanEn"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagsSection;
