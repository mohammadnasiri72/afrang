"use client";

function EmptyLegalIcon() {
    return (
        <svg
            width="128"
            height="128"
            viewBox="0 0 128 128"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Background Circle */}
            <circle cx="64" cy="64" r="60" fill="#F3F4F6" />
            
            {/* Document Icon */}
            <path
                d="M88 40H40C38.8954 40 38 40.8954 38 42V86C38 87.1046 38.8954 88 40 88H88C89.1046 88 90 87.1046 90 86V42C90 40.8954 89.1046 40 88 40Z"
                stroke="#9CA3AF"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            
            {/* Document Lines */}
            <path
                d="M48 56H80"
                stroke="#9CA3AF"
                strokeWidth="4"
                strokeLinecap="round"
            />
            <path
                d="M48 68H80"
                stroke="#9CA3AF"
                strokeWidth="4"
                strokeLinecap="round"
            />
            <path
                d="M48 80H64"
                stroke="#9CA3AF"
                strokeWidth="4"
                strokeLinecap="round"
            />
            
            {/* Plus Icon */}
            <circle cx="64" cy="64" r="24" fill="#E5E7EB" />
            <path
                d="M64 52V76"
                stroke="#9CA3AF"
                strokeWidth="4"
                strokeLinecap="round"
            />
            <path
                d="M52 64H76"
                stroke="#9CA3AF"
                strokeWidth="4"
                strokeLinecap="round"
            />
            
            {/* Decorative Elements */}
            <circle cx="32" cy="32" r="4" fill="#E5E7EB" />
            <circle cx="96" cy="32" r="4" fill="#E5E7EB" />
            <circle cx="32" cy="96" r="4" fill="#E5E7EB" />
            <circle cx="96" cy="96" r="4" fill="#E5E7EB" />
        </svg>
    );
}

export default EmptyLegalIcon; 