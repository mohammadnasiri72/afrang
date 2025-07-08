import React from "react";
import LayoutBlogs from "./LayoutBlogs";

export const metadata = {
  title: "اخبار و مقالات",
  description: "اخبار و مقالات",
};
export default async function layoutBlog({ children }) {
  return <LayoutBlogs>{children}</LayoutBlogs>;
}






