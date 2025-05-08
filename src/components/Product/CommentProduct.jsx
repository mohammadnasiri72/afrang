"use client";

import CommentSection from "../comments/CommentSection";

function CommentProduct({ comments , id , totalCount}) {
  return (
    <>
      <CommentSection id={id} comments={comments} totalCount={totalCount}/>
    </>
  );
}

export default CommentProduct;
