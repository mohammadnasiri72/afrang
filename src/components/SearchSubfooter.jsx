import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Loading from "./Loading";
import { AiOutlineProduct } from "react-icons/ai";

function SearchSubfooter() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <>
      <Link
        href="/products"
        onClick={(ev) => {
          ev.preventDefault();
          startTransition(() => {
            router.push("/products");
          });
        }}
        aria-label="محصولات"
      >
       <AiOutlineProduct className="text-[#d1182b] text-2xl" />
      </Link>
      {isPending && <Loading />}
    </>
  );
}

export default SearchSubfooter;
