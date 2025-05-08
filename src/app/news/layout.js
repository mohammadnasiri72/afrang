import React from "react";

export const metadata = {
  title: "اخبار و مقالات",
  description: "اخبار و مقالات",
};
export default async function layoutBlog({ children }) {
  return <div>{children}</div>;
}
