import { SignIn } from "@clerk/clerk-react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignIn path="/login" routing="path" signUpUrl="/register" />
    </div>
  );
}
