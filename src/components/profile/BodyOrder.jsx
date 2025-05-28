"use client";
import { useSelector } from 'react-redux';

export default function BodyOrder() {
    const dashboardData = useSelector((state) => state.dashboard);

    return (
        <div>
            {/* حالا می‌تونید از dashboardData استفاده کنید */}
            <div>ثبت شده: {dashboardData.Record}</div>
            <div>منتظر پردازش: {dashboardData.Pending}</div>
            <div>درحال انجام: {dashboardData.Process}</div>
            <div>انجام شده: {dashboardData.Done}</div>
            <div>لغو شده: {dashboardData.Cancel}</div>
        </div>
    );
} 