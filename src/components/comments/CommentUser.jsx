import { getImageUrl } from "@/utils/mainDomain";
import React from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaCommentSlash } from "react-icons/fa";
import moment from "moment-jalaali";

const convertPersianToEnglish = (str) => {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  return str.split('').map(char => {
    const index = persianNumbers.indexOf(char);
    return index !== -1 ? englishNumbers[index] : char;
  }).join('');
};

const formatPersianDate = (dateString) => {
  try {
    const persianMonths = [
      'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
      'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ];
    
    const date = moment(dateString);
    return `${date.jDate()} ${persianMonths[date.jMonth()]} ${date.jYear()}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

// کامپوننت حالت خالی
const EmptyComments = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <FaCommentSlash className="text-6xl text-gray-300 mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">هنوز نظری ثبت نشده است</h3>
      <p className="text-gray-500 text-center max-w-md">
        اولین نفری باشید که نظر خود را درباره این مطلب بیان می‌کنید
      </p>
    </div>
  );
};

// کامپوننت داخلی برای نمایش هر کامنت
const CommentItem = ({ comment, onReply }) => {
  return (
    <div className="mt-4">
      <div className="flex justify-between px-2 items-start">
        <div className="flex items-center">
          <img
            src={getImageUrl(comment.userPhoto)}
            alt={comment.name || "کاربر"}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col px-3">
            <span className="font-bold">{comment.name || "ناشناس"}</span>
            <span className="text-[#0008]">{formatPersianDate(comment.created)}</span>
          </div>
        </div>
        {onReply && (
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => onReply(comment.id)}
          >
            <BiSolidMessageRounded className="text-red-700" />
            <span className="text-xs text-[#0008] px-2 duration-300 group-hover:text-[#000]">
              پاسخ
            </span>
          </div>
        )}
      </div>
      <p className="mt-5 text-[#000a]">{comment.body}</p>
    </div>
  );
};

// تابع بازگشتی برای نمایش کامنت‌های فرزند
const CommentTree = ({ comments, parentId = null, onReply, depth = 0 , type}) => {
  // برای کامنت‌های اصلی، parentId باید null باشد
  const currentParentId = parentId === null ? null : parentId.toString();
  
  const filteredComments = comments.filter(
    (comment) => {
      const commentParentId = comment.parentId?.toString();
      // اگر currentParentId null باشد، به دنبال کامنت‌های اصلی هستیم (parentId: "-1")
      if (currentParentId === null) {
        return commentParentId === "-1";
      }
      // در غیر این صورت، به دنبال پاسخ‌ها هستیم
      return commentParentId === currentParentId;
    }
  );
  
  // اگر کامنتی وجود نداشت و در سطح اصلی هستیم، حالت خالی را نمایش می‌دهیم
  // if (filteredComments.length === 0 && currentParentId === null) {
  //   return <EmptyComments />;
  // }

  
  
  return (
    <>
      {filteredComments.map((comment) => (
        <div key={comment.id} className={currentParentId !== null ? "pr-14" : ""}>
          <CommentItem 
            comment={comment} 
            onReply={onReply} 
          />
          {/* نمایش پاسخ‌ها برای هر کامنت */}
          <CommentTree
            comments={comments}
            parentId={comment.id}
            onReply={onReply}
            depth={depth + 1}
          />
        </div>
      ))}
    </>
  );
};

function CommentUser({ comments, onReply , type}) {
  
  return (
    <div className="bg-white p-4 mt-3 rounded-lg">
      {/* <h2 className="font-semibold text-[18px]">نظرات کاربران</h2> */}
      {/* <h4 className="px-7 text-2xl font-bold text-[#d1182b]">نظرات کاربران</h4> */}
      {/* <hr className="mt-4 border-[#40768c55]" /> */}
      <CommentTree comments={comments} onReply={onReply} type={type} />
    </div>
  );
}

export default CommentUser;
