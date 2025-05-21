import dynamic from 'next/dynamic';

const Register = dynamic(() => import("@/components/Auth/Register/Register"));

export default function RegisterPage() {
  return (
    <div>
      <Register />
    </div>
  );
}