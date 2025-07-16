"use client";

import { getComment, sendComment } from "@/services/comments/serviceComment";
import { useEffect, useRef, useState } from "react";
import { FaCommentSlash, FaQuestionCircle } from "react-icons/fa";
import CommentUser from "./CommentUser";
import SendCommentBox from "./SendCommentBox";

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
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const commentBoxRef = useRef(null);

  console.log(comments);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const initialComments = await getComment(id, 1, type);
        if (initialComments && Array.isArray(initialComments)) {
          setComments(initialComments);
        } else if (initialComments && Array.isArray(initialComments.items)) {
          setComments(initialComments.items);
        } else {
          setComments([]);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [id, type]);

  const handleReply = (commentId) => {
    setReplyTo(commentId);
    setReplyText("");
  };

  const handleReplySubmit = async (parentId) => {
    if (!replyText.trim()) return;
    setReplyLoading(true);
    try {
      await sendComment({
        itemId: id,
        parentId,
        type,
        body: replyText,
      });
      setReplyTo(null);
      setReplyText("");
      if (typeof onCommentSent === "function") onCommentSent();
    } catch (e) {
      // handle error (optional: show toast)
    } finally {
      setReplyLoading(false);
    }
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
          {type === 0 ? "هنوز نظری ثبت نشده است" : "هنوز پرسشی ثبت نشده است"}
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          {type === 0
            ? "اولین نفری باشید که نظر خود را درباره این مطلب بیان می‌کنید"
            : "اولین نفری باشید که پرسش خود را درباره این مطلب مطرح می‌کنید"}
        </p>
      </div>
    );
  };

  return (
    <>
      {Array.isArray(comments) &&
      comments.filter((c) => c && c.id).length > 0 ? (
        <div>
          {comments
            .filter((c) => c && c.id)
            .map((comment) => (
              <div key={comment.id} className="mb-6">
                <CommentUser
                  comments={[comment]}
                  onReply={handleReply}
                  type={type}
                />
                {replyTo === comment.id && (
                  <div className="flex items-center gap-2 mt-3 ml-8">
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#d1182b]"
                      placeholder="پاسخ خود را بنویسید..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      disabled={replyLoading}
                    />
                    <button
                      className="bg-[#d1182b] text-white px-4 py-2 rounded-lg hover:bg-[#b31525] transition-colors disabled:opacity-50"
                      onClick={() => handleReplySubmit(comment.id)}
                      disabled={replyLoading || !replyText.trim()}
                    >
                      {replyLoading ? "در حال ثبت..." : "ثبت"}
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      ) : (
        Array.isArray(comments) && !isloading && <EmptyComments />
      )}
      {isloading && (
        <div className="bg-white p-4 mt-3 rounded-lg">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
          <hr className="mt-4 border-[#40768c55]" />
          <CommentSkeleton />
        </div>
      )}
      <div
        id="comment-box"
        className="transition-all duration-500 z-50 relative"
      >
        <SendCommentBox
          ref={commentBoxRef}
          itemId={id}
          parentId={-1}
          onCommentSent={handleCommentSent}
          type={type}
        />
      </div>
    </>
  );
}

export default CommentSection;
