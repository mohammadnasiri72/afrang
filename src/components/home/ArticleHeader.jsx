"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FaCaretLeft } from "react-icons/fa6";
import Loading from "../Loading";

function ArticleHeader() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between items-center !mb-5 sm:px-3 px-2">
        <div className="flex items-center title-newProduct relative">
          <h2 className="font-semibold text-xl ">
            اخبار و مقالات <span className="text-[#d1182b]">افرنگ</span>
          </h2>
        </div>

        <div
          onClick={() => {
            startTransition(() => {
              router.push(`/news`);
            });
          }}
          className="flex items-center cursor-pointer duration-300 hover:text-[#d1182b] font-medium"
        >
          <span>نمایش همه</span>
          <FaCaretLeft />
        </div>
      </div>
      {isPending && <Loading />}
    </>
  );
}

export default ArticleHeader;
