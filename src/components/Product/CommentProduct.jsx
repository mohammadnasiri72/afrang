"use client";

import CommentSection from "../comments/CommentSection";

function CommentProduct({ id , type }) {
  return (
    <>
      <CommentSection id={id} type={type} />
    </>
  );
}

export default CommentProduct;
