"use client";

import { Card, List, Rate, Empty, Segmented, Modal, Tooltip, Button, Input } from 'antd';
import { CommentOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/slices/userSlice';
import { useEffect, useState, useRef, useCallback } from 'react';
import { getUserComments, deleteComment, editComment } from '@/services/comments/serviceComment';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";

const CommentsSkeleton = () => {
    return (
        <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
                <Card key={index} className="w-full !p-4 !mt-2">
                    <div className="flex-1 min-w-0">
                        {/* Title and Link Skeleton */}
                        <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gray-200 animate-pulse flex-shrink-0" />
                                <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4 md:w-48" />
                            </div>
                            <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                        </div>

                        {/* Name and Rating Skeleton */}
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <div className="h-4 bg-gray-200 animate-pulse rounded w-32" />
                            <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                        </div>

                        {/* Comment Text Skeleton */}
                        <div className="space-y-1 mb-1">
                            <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
                            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                        </div>

                        {/* Date Skeleton */}
                        <div className="h-3 bg-gray-200 animate-pulse rounded w-20" />
                    </div>
                </Card>
            ))}
        </div>
    );
};

const DeleteCommentModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!isOpen || !mounted) return null;

    const modalContent = (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center">
            <div 
                className="fixed inset-0 bg-black/30 backdrop-blur-[3px] transition-opacity duration-300"
                onClick={onClose}
            />
            <div 
                className="relative bg-white rounded-lg p-6 w-full max-w-sm mx-4 transform transition-all duration-300 scale-100 opacity-100 shadow-xl"
                style={{
                    animation: 'modalFadeIn 0.3s ease-out'
                }}
            >
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#d1182b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <h3 className="text-lg font-bold text-gray-900">حذف نظر</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-6">آیا از حذف این نظر اطمینان دارید؟</p>
                </div>
                <div className="flex justify-center gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className={`px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md transition-colors ${
                            isLoading 
                                ? "opacity-50 cursor-not-allowed" 
                                : "hover:bg-gray-200 cursor-pointer"
                        }`}
                    >
                        انصراف
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`px-4 py-2 text-sm bg-[#d1182b] text-white rounded-md transition-colors min-w-[90px] ${
                            isLoading ? "cursor-not-allowed" : "cursor-pointer hover:bg-[#b91626]"
                        }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-1">
                                <FaSpinner className="animate-spin text-xs" />
                                <span>در حال حذف</span>
                            </div>
                        ) : (
                            "تایید"
                        )}
                    </button>
                </div>
            </div>

            <style jsx global>{`
                @keyframes modalFadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );

    return createPortal(modalContent, document.body);
};

const MiniCommentsSkeleton = () => (
    <div className="space-y-2 mt-2">
        {[...Array(3)].map((_, index) => (
            <Card key={index} className="w-full !p-4 !mt-2">
                <div className="flex-1 min-w-0">
                    {/* Title and Link Skeleton */}
                    <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gray-200 animate-pulse flex-shrink-0" />
                            <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4 md:w-48" />
                        </div>
                        <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                    </div>

                    {/* Name and Rating Skeleton */}
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <div className="h-4 bg-gray-200 animate-pulse rounded w-32" />
                        <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                    </div>

                    {/* Comment Text Skeleton */}
                    <div className="space-y-1 mb-1">
                        <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
                        <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                    </div>

                    {/* Date Skeleton */}
                    <div className="h-3 bg-gray-200 animate-pulse rounded w-20" />
                </div>
            </Card>
        ))}
    </div>
);

const UserCommentsPage = () => {
    const user = useSelector(selectUser);
    const [comments, setComments] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [counts, setCounts] = useState({ comments: 0, questions: 0 });
    const observer = useRef();
    const pageSize = 10;
    const [editingComment, setEditingComment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [deletingIds, setDeletingIds] = useState(new Set());

    // تنظیمات Toast
    const Toast = Swal.mixin({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: "toast-modal",
    });

    const fetchCounts = async () => {
        try {
            // Fetch comments count
            const commentsResponse = await getUserComments(
                { 
                    langCode: "fa", 
                    type: 0,
                    pageSize: 1,
                    pageIndex: 1
                }, 
                user.token
            );

            // Fetch questions count
            const questionsResponse = await getUserComments(
                { 
                    langCode: "fa", 
                    type: 1,
                    pageSize: 1,
                    pageIndex: 1
                }, 
                user.token
            );            

            if (commentsResponse.type !== 'error' && questionsResponse.type !== 'error') {
                setCounts({
                    comments: commentsResponse[0]?.total || 0,
                    questions: questionsResponse[0]?.total || 0
                });
            }
        } catch (error) {
            console.error('Error fetching counts:', error);
        }
    };

    const lastElementRef = useCallback((node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    const fetchData = async (pageNumber, type) => {
        if (pageNumber === 1) {
            setLoading(true);
        } else {
            setIsFetchingMore(true);
        }
        try {
            const response = await getUserComments(
                { 
                    langCode: "fa", 
                    type: type,
                    pageSize: pageSize,
                    pageIndex: pageNumber
                }, 
                user.token
            );

            if (response.type !== 'error') {
                // Update counts from the first item's total
                if (response[0]?.total) {
                    setCounts(prev => ({
                        ...prev,
                        [type === 0 ? 'comments' : 'questions']: response[0].total
                    }));
                }

                if (type === 0) {
                    setComments(prev => pageNumber === 1 ? response : [...prev, ...response]);
                    setHasMore(response.length === pageSize);
                } else {
                    setQuestions(prev => pageNumber === 1 ? response : [...prev, ...response]);
                    setHasMore(response.length === pageSize);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            if (pageNumber === 1) {
                setLoading(false);
            } else {
                setIsFetchingMore(false);
            }
        }
    };

    // Initial load - fetch counts and first page data
    useEffect(() => {
        if (user?.token) {
            setLoading(true);
            fetchCounts();
            fetchData(1, activeTab);
        }
    }, [user?.token]);

    // Handle tab change
    useEffect(() => {
        if (user?.token) {
            setPage(1);
            setHasMore(true);
            setLoading(true);
            fetchData(1, activeTab);
        }
    }, [activeTab]);

    // Handle infinite scroll
    useEffect(() => {
        if (page > 1 && user?.token) {
            fetchData(page, activeTab);
        }
    }, [page]);

    const renderList = (items) => (
        <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={(item, index) => (
                <List.Item
                    ref={index === items.length - 1 ? lastElementRef : null}
                >
                    <Card 
                        className={`w-full transition-all duration-500 ${
                            deletingIds.has(item.id) ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
                        }`}
                    >
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                        <CommentOutlined className="text-lg text-gray-400" />
                                    </div>
                                    <Link 
                                        href={item.url} 
                                        target="_blank" 
                                        className="hover:!text-[#d1182b] !text-[#4B5563] transition-colors duration-200 text-decoration-none"
                                    >
                                        <h3 className="text-base font-bold break-words">{item.title}</h3>
                                    </Link>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Tooltip title="ویرایش نظر" placement="top">
                                        <button 
                                            onClick={() => handleEdit(item)}
                                            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
                                        >
                                            <EditOutlined className="text-lg !text-teal-500 hover:!text-t" />
                                        </button>
                                    </Tooltip>
                                    <Tooltip title="حذف نظر" placement="top">
                                        <button 
                                            onClick={() => handleDelete(item)}
                                            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
                                        >
                                            <DeleteOutlined className="text-lg !text-[#d1182b] hover:!text-[#b91626]" />
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                {(item.score || item.score===0) && (
                                    <Rate disabled value={item.score} className="text-sm" />
                                )}
                            </div>
                            <p className="text-sm text-gray-600 mb-1 whitespace-pre-wrap text-justify break-words">{item.body}</p>
                            <p className="text-xs text-gray-500">
                                {new Date(item.created).toLocaleDateString('fa-IR')}
                            </p>
                        </div>
                    </Card>
                </List.Item>
            )}
        />
    );

    const options = [
        { label: `نظرات (${counts.comments})`, value: 0 },
        { label: `پرسش‌ها (${counts.questions})`, value: 1 },
    ];

    const handleEdit = (comment) => {
        setEditingComment(comment);
        setIsModalOpen(true);
    };

    const handleDelete = (comment) => {
        setSelectedComment(comment);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedComment) return;
        
        setIsDeleting(true);
        try {
            const response = await deleteComment(selectedComment.id, user.token);
            if (response.type === 'error') {
                Toast.fire({
                    icon: 'error',
                    title: response.message
                });
                return;
            }

            // Add the ID to deletingIds to trigger animation
            setDeletingIds(prev => new Set([...prev, selectedComment.id]));
            
            // Wait for animation to complete before removing from state
            setTimeout(() => {
                if (activeTab === 0) {
                    setComments(prev => prev.filter(item => item.id !== selectedComment.id));
                    setCounts(prev => ({ ...prev, comments: prev.comments - 1 }));
                } else {
                    setQuestions(prev => prev.filter(item => item.id !== selectedComment.id));
                    setCounts(prev => ({ ...prev, questions: prev.questions - 1 }));
                }
                setDeletingIds(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(selectedComment.id);
                    return newSet;
                });
            }, 500); // Match this with CSS animation duration

            Toast.fire({
                icon: 'success',
                title: 'نظر با موفقیت حذف شد'
            });
            setIsDeleteModalOpen(false);
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: error.message || 'خطا در حذف نظر'
            });
        } finally {
            setIsDeleting(false);
            setSelectedComment(null);
        }
    };

    const handleModalOk = async () => {
        setIsEditLoading(true);
        try {
            const response = await editComment({
                id: editingComment.id,
                body: editingComment.body
            }, user.token);

            if (response.type === 'error') {
                Toast.fire({
                    icon: 'error',
                    title: response.message
                });
                return;
            }

            Toast.fire({
                icon: 'success',
                title: 'نظر با موفقیت ویرایش شد'
            });
            
            if (activeTab === 0) {
                setComments(prev => prev.map(item => 
                    item.id === editingComment.id ? { ...item, body: editingComment.body } : item
                ));
            } else {
                setQuestions(prev => prev.map(item => 
                    item.id === editingComment.id ? { ...item, body: editingComment.body } : item
                ));
            }

            setIsModalOpen(false);
            setEditingComment(null);
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: error.message || 'خطا در ویرایش نظر'
            });
        } finally {
            setIsEditLoading(false);
        }
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
        setEditingComment(null);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-6">نظرات ارسالی</h1>
            
            <div className="flex flex-wrap bg-white rounded-lg mt-3 z-50 relative">
                <div className="w-full SegmentedProduct overflow-hidden mx-auto flex justify-center p-5">
                    <Segmented
                        className="font-semibold text-3xl w-full overflow-auto"
                        dir="rtl"
                        style={{
                            padding: "8px",
                            fontFamily: "yekan",
                            width: "100%",
                            maxWidth: "100%",
                            overflow: "hidden"
                        }}
                        value={activeTab}
                        onChange={(value) => {
                            setActiveTab(value);
                            setPage(1);
                            setHasMore(true);
                        }}
                        options={options}
                    />
                </div>

                <div className="w-full">
                    {loading && page === 1 ? (
                        <CommentsSkeleton />
                    ) : activeTab === 0 ? (
                        comments.length > 0 ? (
                            <>
                                {renderList(comments)}
                                {isFetchingMore && <MiniCommentsSkeleton />}
                            </>
                        ) : (
                            loading ? <CommentsSkeleton /> : <Empty description="شما هنوز نظری ثبت نکرده‌اید" className="my-8" />
                        )
                    ) : (
                        questions.length > 0 ? (
                            <>
                                {renderList(questions)}
                                {isFetchingMore && <MiniCommentsSkeleton />}
                            </>
                        ) : (
                            loading ? <CommentsSkeleton /> : <Empty description="شما هنوز پرسشی ثبت نکرده‌اید" className="my-8" />
                        )
                    )}
                </div>
            </div>

            <Modal
                title="ویرایش نظر"
                open={isModalOpen}
                onCancel={handleModalCancel}
                footer={[
                    <Button
                        key="cancel"
                        onClick={handleModalCancel}
                        className="!bg-gray-100 hover:!bg-gray-200 !text-gray-700 !border-0"
                    >
                        انصراف
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleModalOk}
                        loading={isEditLoading}
                        className="!bg-[#00a76f] hover:!bg-[#007867] !border-0"
                    >
                        {isEditLoading ? "در حال ویرایش..." : "ویرایش"}
                    </Button>,
                ]}
                className="!w-[90%] md:!w-[500px]"
            >
                {editingComment && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                متن نظر
                            </label>
                            <textarea
                                value={editingComment.body}
                                onChange={(e) => setEditingComment({ ...editingComment, body: e.target.value })}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00a76f] focus:ring-1 focus:ring-[#00a76f] resize-none text-justify whitespace-pre-wrap"
                            />
                        </div>
                    </div>
                )}
            </Modal>
            <DeleteCommentModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedComment(null);
                }}
                onConfirm={handleDeleteConfirm}
                isLoading={isDeleting}
            />
        </div>
    );
};

export default UserCommentsPage; 