import dynamic from 'next/dynamic';
import Loading from "@/components/Loading";

const Login = dynamic(() => import("@/components/Auth/Login/Login"), {
  loading: () => <Loading />
});

export default function LoginPage() {
  return (
    <div>
      <Login />
    </div>
  );
}
