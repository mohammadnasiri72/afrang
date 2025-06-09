import dynamic from 'next/dynamic';

const ForgotPassword = dynamic(() => import("@/components/Auth/ForgotPassword/ForgotPassword"));

export default function LoginPage() {
  return (
    <div>
      <ForgotPassword />
    </div>
  );
}
