import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('@/components/profile/Dashboard'));

export default function DashboardPage() {
    return <Dashboard />;
} 