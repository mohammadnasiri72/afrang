"use client";

import { sendComment } from "@/services/comments/serviceComment";
import { useRef, useState } from "react";
import { FaCommentSlash, FaQuestionCircle } from "react-icons/fa";
import CommentUser from "./CommentUser";
import SendCommentBox from "./SendCommentBox";

function CommentSection({ id, type, comments }) {
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const commentBoxRef = useRef(null);

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
          <FaCommentSlash className="text-6xl text-gray-300 !mb-4" />
        ) : (
          <FaQuestionCircle className="text-6xl text-gray-300 !mb-4" />
        )}
        <span className="text-xl font-semibold text-gray-700 !mb-2">
          {type === 0 ? "هنوز نظری ثبت نشده است" : "هنوز پرسشی ثبت نشده است"}
        </span>
        <p className="text-gray-800 text-center max-w-md text-lg">
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
              <div key={comment.id} className="!mb-6">
                <CommentUser
                  comments={[comment]}
                  onReply={handleReply}
                  type={type}
                />
                {replyTo === comment.id && (
                  <div className="flex items-center gap-2 mt-3 ml-8">
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#d1182b] !text-[16px]"
                      placeholder="پاسخ خود را بنویسید..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      disabled={replyLoading}
                    />
                    <button
                      className="bg-[#d1182b] !text-white px-4 py-2 rounded-lg hover:bg-[#b31525] transition-colors disabled:opacity-50"
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
        Array.isArray(comments) && <EmptyComments />
      )}

      <div
        id="comment-box"
        className="transition-all duration-500 z-50 relative h-[25rem] overflow-auto"
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
