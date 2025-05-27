"use client";

import { useEffect, useState } from "react";
import CommentUser from "./CommentUser";
import LoadMoreButton from "./LoadMoreButton";
import SendCommentBox from "./SendCommentBox";
import { getComment } from "@/services/comments/serviceComment";
import { FaCommentSlash, FaQuestionCircle } from "react-icons/fa";

// کامپوننت اسکلتون برای لودینگ
const CommentSkeleton = () => {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((item) => (
        <div key={item} className="mt-4">
          <div className="flex justify-between px-2 items-start">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
              <div className="flex flex-col px-3">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
          <div className="mt-5 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

function CommentSection({ id, type }) {
  const [comments, setComments] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);




  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const initialComments = await getComment(id, 1, type);
        setComments(initialComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchComments();
  }, [id, type]);

  const loadMoreComments = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const { items: newComments } = await getComment(id, nextPage, type);

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


  // کامپوننت حالت خالی
  const EmptyComments = () => {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        {type === 0 ? (
          <FaCommentSlash className="text-6xl text-gray-300 mb-4" />
        ) : (
          <FaQuestionCircle className="text-6xl text-gray-300 mb-4" />
        )}
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {type === 0 
            ? "هنوز نظری ثبت نشده است"
            : "هنوز پرسشی ثبت نشده است"
          }
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          {type === 0 
            ? "اولین نفری باشید که نظر خود را درباره این مطلب بیان می‌کنید"
            : "اولین نفری باشید که پرسش خود را درباره این مطلب مطرح می‌کنید"
          }
        </p>
      </div>
    );
  };



  return (
    <>
      {
        comments && comments.length > 0 &&
        <div>
          <CommentUser comments={comments} onReply={handleReply} type={type} />
          {/* {totalCount > comments.length && (
        <LoadMoreButton loading={loading} onClick={loadMoreComments} />
      )} */}
          <div id="comment-box" className="transition-all duration-500 z-50 relative">
            <SendCommentBox
              itemId={id}
              parentId={replyTo || -1}
              onCommentSent={handleCommentSent}
              type={type}
            />
          </div>
        </div>
      }
      {
        (!comments || comments.length === 0) && !isloading &&
        <EmptyComments />
      }
      {
        isloading &&
        <div className="bg-white p-4 mt-3 rounded-lg">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
          <hr className="mt-4 border-[#40768c55]" />
          <CommentSkeleton />
        </div>
      }
    </>
  );
}

export default CommentSection;
