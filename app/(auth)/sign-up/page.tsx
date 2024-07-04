import AuthForm from "@/components/auth/AuthForm";

export default function SignUp() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <AuthForm type="sign-up" />
    </div>
  );
}
