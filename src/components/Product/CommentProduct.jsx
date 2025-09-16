"use client";

import { getImageUrl } from "@/utils/mainDomain";
import { Divider } from "antd";
import moment from "moment-jalaali";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaCommentSlash,
  FaQuestionCircle,
  FaReply,
  FaUserCircle,
} from "react-icons/fa";
import SendCommentBox from "../comments/SendCommentBox";

function buildCommentTree(comments) {
  const map = {};
  const roots = [];
  comments.forEach((comment) => {
    map[comment.id] = { ...comment, replies: [] };
  });
  comments.forEach((comment) => {
    if (comment.parentId !== -1 && map[comment.parentId]) {
      map[comment.parentId].replies.push(map[comment.id]);
    } else {
      roots.push(map[comment.id]);
    }
  });
  return roots;
}

function formatPersianDate(dateString) {
  try {
    const persianMonths = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];
    const date = moment(dateString);
    return `${date.jDate()} ${persianMonths[date.jMonth()]} ${date.jYear()}`;
  } catch {
    return dateString;
  }
}

function CommentItem({ comment, onReply, replyTo, onReplySent, depth = 0 }) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  // اگر replyTo تغییر کند، showReplyBox را آپدیت کن
  useEffect(() => {
    setShowReplyBox(replyTo === comment.id);
  }, [replyTo, comment.id]);

  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex items-start gap-3"
        style={{
          paddingRight: depth > 0 ? `${depth * 24}px` : undefined,
          borderRight: depth > 0 ? "2px solid #e5e7eb" : undefined,
        }}
      >
        <div>
          {comment.userPhoto ? (
            <img
              src={getImageUrl(comment.userPhoto)}
              alt={comment.name}
              className={`${
                depth > 0 ? "w-7 h-7" : "w-10 h-10"
              } rounded-full object-cover bg-gray-100`}
              onError={(e) => (e.target.style.display = "none")}
            />
          ) : (
            <FaUserCircle
              className={`${depth > 0 ? "w-7 h-7" : "w-10 h-10"} text-gray-400`}
            />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold">{comment.name}</span>
            <span className="text-xs text-gray-500">
              {formatPersianDate(comment.created)}
            </span>
          </div>
          <div className="mt-1 text-gray-800 text-justify">{comment.body}</div>
          {comment.parentId === -1 && (
            <button
              className="mt-3 flex cursor-pointer items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full shadow-sm border border-blue-200 hover:bg-blue-100 hover:text-blue-900 hover:shadow-md transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={() => onReply(comment.id)}
            >
              <FaReply className="text-base" />
              پاسخ
            </button>
          )}
          {/* فرم پاسخ با انیمیشن */}
          <div
            className={`transition-all duration-300 overflow-hidden ${
              showReplyBox
                ? "max-h-[500px] opacity-100 mt-4"
                : "max-h-0 opacity-0 mt-0"
            }`}
          >
            {showReplyBox && (
              <div className="bg-white border border-blue-100 rounded-lg shadow p-4">
                <SendCommentBox
                  itemId={comment.itemId}
                  parentId={comment.id}
                  type={comment.type}
                  onCommentSent={onReplySent}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* نمایش پاسخ‌ها */}
      {comment.replies && comment.replies.length > 0 && (
        <div>
          {comment.replies.map((reply) => (
            <div className="py-2" key={reply.id}>
              <CommentItem
                comment={reply}
                onReply={onReply}
                replyTo={replyTo}
                onReplySent={onReplySent}
                depth={depth + 1}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CommentProduct({ comments, type, id }) {
  const [replyTo, setReplyTo] = useState(null);
  const commentBoxRef = useRef(null);

  const commentTree =
    comments && comments.length > 0
      ? useMemo(() => buildCommentTree(comments), [comments])
      : [];

  const handleReply = (commentId) => {
    setReplyTo(commentId);
  };

  const handleReplySent = () => {
    setReplyTo(null);
  };

  const EmptyComments = () => {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        {type === 0 ? (
          <FaCommentSlash className="text-6xl text-gray-300 mb-4" />
        ) : (
          <FaQuestionCircle className="text-6xl text-gray-300 mb-4" />
        )}
        <span className="text-xl font-semibold text-gray-700 mb-2">
          {type === 0 ? "هنوز نظری ثبت نشده است" : "هنوز پرسشی ثبت نشده است"}
        </span>
        <p className="text-gray-500 text-center max-w-md">
          {type === 0
            ? "اولین نفری باشید که نظر خود را درباره این مطلب بیان می‌کنید"
            : "اولین نفری باشید که پرسش خود را درباره این مطلب مطرح می‌کنید"}
        </p>
      </div>
    );
  };

  // تعیین عنوان و placeholder بر اساس نوع
  const boxTitle =
    type === 1 ? "پرسش خود را وارد کنید" : "نظر خود را وارد کنید";
  const placeholder =
    type === 1 ? "پرسش خود را اینجا بنویسید*" : "نظر خود را اینجا بنویسید*";

  return (
    <div className="mx-auto py-4 sm:px-10 px-5 bg-white rounded-lg shadow">
      {commentTree.length === 0 ? (
        <EmptyComments />
      ) : (
        commentTree.map((comment) => (
          <div key={comment.id}>
            <CommentItem
              comment={comment}
              onReply={handleReply}
              replyTo={replyTo}
              onReplySent={handleReplySent}
              depth={0}
            />
            <Divider />
          </div>
        ))
      )}
      {/* فرم ثبت کامنت جدید پایین لیست */}
      <div className="mt-8 h-[25rem] overflow-auto">
        <SendCommentBox
          ref={commentBoxRef}
          itemId={id}
          parentId={-1}
          type={type}
          boxTitle={boxTitle}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default CommentProduct;
