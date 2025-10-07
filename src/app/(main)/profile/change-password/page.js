import dynamic from 'next/dynamic';

const ChangePassword = dynamic(() => import("@/components/profile/ChangePassword"));

export default function ChangePasswordPage() {
    return <ChangePassword />;
} 