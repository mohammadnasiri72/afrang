import dynamic from 'next/dynamic';

const LegalList = dynamic(() => import("@/components/profile/legal/LegalList"));

export default function LegalPage() {
    return <LegalList />;
} 