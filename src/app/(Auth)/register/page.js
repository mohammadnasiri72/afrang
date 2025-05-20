import dynamic from 'next/dynamic';
import Loading from "@/components/Loading";

const Register = dynamic(() => import("@/components/Auth/Register/Register"), {
  loading: () => <Loading />
});

export default function RegisterPage() {
  return (
    <div>
      <Register />
    </div>
  );
}