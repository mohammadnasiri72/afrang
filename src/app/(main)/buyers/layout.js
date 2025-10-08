import { mainUrl } from "@/utils/mainDomain";

export const metadata = {
  title: "پیشنهادات خرید دست دوم کاربران",
  description: "پیشنهادات خرید دست دوم کاربران",
  keywords: "خرید, دست دوم, کاربران",
  url: "/buyers",
  alternates: {
    canonical: `${mainUrl}/buyers`,
  },
};

export default async function layoutUserAdd({ children }) {
  return <div>{children}</div>;
}
