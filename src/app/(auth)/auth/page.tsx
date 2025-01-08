import { AuthForm } from "@/components/forms/AuthForm";


export default function AuthPage(){
    return (
        <main className="container mx-auto py-8">
            <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold text-center mb-6">
                Welcome Back
                </h1> 
                <AuthForm />
            </div>
        </main>
    )
}