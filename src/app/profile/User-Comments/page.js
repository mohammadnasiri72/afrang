"use client";

import { Card, List, Avatar, Rate, Empty } from 'antd';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/slices/userSlice';
import { useEffect, useState } from 'react';
import { getUserComments } from '@/services/comments/serviceComment';

const CommentsSkeleton = () => {
    return (
        <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
                <Card key={index} className="w-full">
                    <div className="flex items-start gap-4">
                        {/* Avatar Skeleton */}
                        <div className="w-16 h-16 rounded-lg bg-gray-200 animate-pulse" />
                        
                        <div className="flex-1 space-y-3">
                            {/* Title Skeleton */}
                            <div className="h-6 bg-gray-200 animate-pulse rounded w-48" />
                            
                            {/* Rating Skeleton */}
                            <div className="h-5 bg-gray-200 animate-pulse rounded w-32" />
                            
                            {/* Comment Text Skeleton */}
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
                                <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                            </div>
                            
                            {/* Date Skeleton */}
                            <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

const UserCommentsPage = () => {
    const user = useSelector(selectUser);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await getUserComments({ langCode: "fa" }, user.token);
                if (response.type === 'error') {
                    message.error(response.message);
                    return;
                }
                setComments(response);
            } catch (error) {
                console.error('Error fetching comments:', error);
            } finally {
                setLoading(false);
            }
        };
        if (user?.token) {
            fetchComments();
        }
    }, [user?.token]);

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-6">نظرات ارسالی</h1>
            
            {loading ? (
                <CommentsSkeleton />
            ) : comments.length > 0 ? (
                <List
                    itemLayout="horizontal"
                    dataSource={comments}
                    renderItem={(comment) => (
                        <List.Item>
                            <Card className="w-full">
                                <div className="flex items-start gap-4">
                                    <Avatar 
                                        src={comment.productImage} 
                                        alt={comment.productName}
                                        className="w-16 h-16 object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold mb-2">{comment.productName}</h3>
                                        <Rate disabled defaultValue={comment.rating} className="mb-2" />
                                        <p className="text-gray-600 mb-2">{comment.comment}</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(comment.createdAt).toLocaleDateString('fa-IR')}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            ) : (
                <Empty 
                    description="شما هنوز نظری ثبت نکرده‌اید" 
                    className="my-8"
                />
            )}
        </div>
    );
};

export default UserCommentsPage; 