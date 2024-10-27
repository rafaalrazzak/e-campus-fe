import LoginForm from "@/app/login/form";
import { AnimatedBackground } from "@/components/common";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <AnimatedBackground />
            <LoginForm />
        </div>
    );
}
