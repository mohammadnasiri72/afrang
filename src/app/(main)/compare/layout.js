import { mainUrl } from "@/utils/mainDomain";

export const metadata = {
  title: "مقایسه محصولات",
  description: "مقایسه محصولات",
  alternates: {
    canonical: mainUrl + "/compare",
  },
};

export default async function layoutCompare({ children }) {
  return <div>{children}</div>;
}
