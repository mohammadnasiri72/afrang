import dynamic from 'next/dynamic';

const Login = dynamic(() => import("@/components/Auth/Login/Login"));

export default function LoginPage() {
  return (
    <div>
      <Login />
    </div>
  );
}
