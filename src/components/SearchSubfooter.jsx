import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Loading from "./Loading";

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
        <span
          className="text-3xl cursor-pointer inline-block align-middle"
          style={{ width: "1.5em", height: "1.5em" }}
        >
          <svg
            width="1.2em"
            height="1.2em"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
          >
            <rect
              width="32"
              height="32"
              rx="16"
              fill="#d1182b"
              fillOpacity="0.08"
            />
            <path
              d="M7 12l9 5 9-5"
              stroke="#d1182b"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M7 12v8a2 2 0 0 0 1 1.73l8 4.62a2 2 0 0 0 2 0l8-4.62A2 2 0 0 0 25 20v-8"
              stroke="#d1182b"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M16 17v7"
              stroke="#d1182b"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </Link>
      {isPending && <Loading />}
    </>
  );
}

export default SearchSubfooter;
