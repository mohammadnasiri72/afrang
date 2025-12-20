"use client";

import { getImageUrl } from "@/utils/mainDomain";
import { useRouter } from "next/navigation";
import Container from "../container";

function CategoryBlog({ category, searchParams }) {
  const router = useRouter();
  const activeCategory = searchParams?.category;

  const handleChangCategory = (cat) => {
    // dispatch(setLoadingBlog(true));
    const params = new URLSearchParams(searchParams);
    if (activeCategory && activeCategory === cat.id.toString()) {
      params.delete("category");
    } else {
      params.set("category", cat.id);
      params.delete("page");
    }
    router.push(`?${params.toString()}`);
   
  };
  return (
    <>
      <Container>
        <div className="flex flex-wrap items-center pt-20">
          {category.map((cat) => (
            <div key={cat.id} className="p-4 lg:w-[14.286%] sm:w-1/4 w-1/2">
              <div
                onClick={() => {
                  handleChangCategory(cat);
                }}
                className="flex flex-col justify-center items-center cursor-pointer"
              >
                <div
                  className={`rounded-[50px] overflow-hidden cursor-pointer border-4 h-52 ${
                    activeCategory === cat.id.toString()
                      ? "border-teal-500 shadow-lg"
                      : "border-transparent"
                  }`}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={getImageUrl(cat.image)}
                    alt=""
                  />
                </div>
                <p
                  className={`cursor-pointer mt-4 text-lg font-semibold ${
                    activeCategory === cat.id.toString() ? "text-teal-500" : ""
                  }`}
                >
                  {cat.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default CategoryBlog;
