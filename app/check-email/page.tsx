import { useAuth } from "@/stores/useAuth";

export default function CheckEmailPage() {
    const {user} = useAuth();
    
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4">Check Your Email</h1>
        <p className="text-muted-foreground mb-6">
          We&apos;ve sent a confirmation link to your inbox. Please click the link to activate your account.
        </p>
        <p className="text-sm text-muted-foreground">
          Didn&apos;t get the email? Check your spam folder or try signing up again with the correct address.
        </p>
      </div>
    </div>
  );
}
