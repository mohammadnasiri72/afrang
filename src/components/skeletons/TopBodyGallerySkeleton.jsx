import React from "react";
import Container from "../container";

function TopBodyGallerySkeleton() {
  return (
    <>
      <Container>
        <div className="flex flex-wrap ">
          <div className="sm:w-5/12 w-full bg-white p-5 rounded-lg">
            <div className="h-96 bg-gray-200 rounded animate-pulse w-full mx-auto"></div>
          </div>
          <div className="sm:w-7/12 w-full bg-white p-5 rounded-lg flex flex-col gap-3">
            <div className="h-10 bg-gray-200 rounded animate-pulse w-full mx-auto"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse w-full mx-auto"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse w-full mx-auto"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse w-full mx-auto"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse w-full mx-auto"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse w-full mx-auto"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse w-full mx-auto"></div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default TopBodyGallerySkeleton;
