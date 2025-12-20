import Link from "next/link";
import { AiOutlineProduct } from "react-icons/ai";

function SearchSubfooter() {
  return (
    <>
      <Link prefetch={false} href="/products" aria-label="محصولات">
        <AiOutlineProduct className="text-[#d1182b] text-2xl" />
      </Link>
    </>
  );
}

export default SearchSubfooter;
