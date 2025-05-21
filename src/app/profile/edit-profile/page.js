import dynamic from 'next/dynamic';

const EditProfile = dynamic(() => import('@/components/profile/EditProfile'));

export default function EditProfilePage() {
    return <EditProfile />;
} 