"use client";

import { selectUser, selectUserProfile } from '@/redux/slices/userSlice';
import { Avatar, Card, Descriptions, Divider } from 'antd';
import { useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';



const AboutMePage = () => {
    const user = useSelector(selectUser);
    const userProfile = useSelector(selectUserProfile);
    return (
        <div className="space-y-6">
            <Card className="shadow-sm z-50 relative">
                <div className="flex items-center gap-6 !mb-6">
                    <Avatar
                        size={100}
                        src={user?.avatar || null}
                        className="bg-gray-200"
                        icon={!user?.avatar && <UserOutlined />}
                    >
                        {user?.avatar ? null : user?.displayName?.charAt(0) || '?'}
                    </Avatar>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 !mb-2">{user?.displayName}</h1>
                        <p className="text-gray-500">شناسه کاربری: {user?.userId}</p>
                    </div>
                </div>

                <Divider />

                <Descriptions title="اطلاعات حساب کاربری" bordered>
                    <Descriptions.Item label="نام و نام خانوادگی" span={3}>
                        {user?.displayName}
                    </Descriptions.Item>
                    <Descriptions.Item label="ایمیل" span={3}>
                        {userProfile?.email || 'ثبت نشده'}
                    </Descriptions.Item>
                    <Descriptions.Item label="شماره موبایل" span={3}>
                        {user?.userId || 'ثبت نشده'}
                    </Descriptions.Item>
                    <Descriptions.Item label="تاریخ تولد" span={3}>
                        {userProfile?.brithDate || 'نامشخص'}
                    </Descriptions.Item>

                </Descriptions>
            </Card>
        </div>
    );
};

export default AboutMePage; 