"use client";

import { useState } from "react";
import CommentUser from "./CommentUser";
import LoadMoreButton from "./LoadMoreButton";
import SendCommentBox from "./SendCommentBox";
import { getComment } from "@/services/comments/serviceComment";

function CommentSection({ id, comments: initialComments = [], totalCount }) {
  const [comments, setComments] = useState(initialComments);
  const [loading, setLoading] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const loadMoreComments = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const { items: newComments } = await getComment(id, nextPage);

      if (newComments && newComments.length > 0) {
        setComments((prev) => [...prev, ...newComments]);
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = (commentId) => {
    setReplyTo(commentId);
    setTimeout(() => {
      document.getElementById("comment-box").scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleCommentSent = () => {
    setReplyTo(null);
  };

  

  return (
    <>
      <CommentUser comments={comments} onReply={handleReply} />
      {totalCount > comments.length && (
        <LoadMoreButton loading={loading} onClick={loadMoreComments} />
      )}
      <div id="comment-box" className="transition-all duration-500 z-50 relative">
        <SendCommentBox
          itemId={id}
          parentId={replyTo || -1}
          onCommentSent={handleCommentSent}
        />
      </div>
    </>
  );
}

export default CommentSection;
