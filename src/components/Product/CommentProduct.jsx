"use client";

import CommentSection from "../comments/CommentSection";

function CommentProduct({ id, type, onReplyScroll }) {
  return (
    <>
      <CommentSection id={id} type={type} onReplyScroll={onReplyScroll} />
    </>
  );
}

export default CommentProduct;
