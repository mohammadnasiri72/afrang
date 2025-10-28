"use client";

import { useState } from "react";
import BlogPagination from "./BlogPagination";
import EmptyBlogs from "./EmptyBlogs";

// کامپوننت اسکلتون برای مقالات
const BlogSkeleton = () => {
  return (
    <div className="flex flex-wrap pt-10">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div key={item} className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2">
          <div className="rounded-lg overflow-hidden bg-white relative z-50 animate-pulse">
            <div className="relative h-[200px] w-full bg-gray-200"></div>
            <div className="p-3">
              <div className="h-6 bg-gray-200 rounded w-3/4 !mb-2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const BlogList = ({ children, blogs, searchParams }) => {
  const [isLoading, setIsLoading] = useState(false);
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams?.pageSize ? parseInt(searchParams.pageSize) : 12;
  const totalCount = blogs[0]?.total;

  return (
    <>
      {isLoading ? (
        <BlogSkeleton />
      ) : (
        children
      )}
      <BlogPagination 
        total={totalCount} 
        pageSize={pageSize} 
        current={page} 
        onLoadingChange={setIsLoading}
      />
      {blogs.length === 0 && <EmptyBlogs />}
    </>
  );
};

export default BlogList; 