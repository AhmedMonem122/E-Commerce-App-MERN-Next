"use client";
import { loginAction, LoginFormState } from "@/app/actions/auth/authActions";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect, useActionState } from "react";
import { toast } from "sonner";
import SubmitLoginButton from "./SubmitLoginButton";

const initialState: LoginFormState = {};

const LoginPage = () => {
  const [state, formAction] = useActionState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state?.message, state?.success]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 px-4">
      <form
        action={formAction}
        className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-primary mb-2">
          Sign In
        </h2>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className={`w-full ${
              state?.validationErrors?.email ? "border-red-500" : ""
            }`}
            autoComplete="email"
          />
          {state?.validationErrors?.email && (
            <p className="text-xs text-red-500 mt-1">
              {state.validationErrors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full pr-10 ${
                state?.validationErrors?.password ? "border-red-500" : ""
              }`}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {state?.validationErrors?.password && (
            <p className="text-xs text-red-500 mt-1">
              {state.validationErrors.password}
            </p>
          )}
        </div>
        <SubmitLoginButton />
      </form>
    </section>
  );
};

export default LoginPage;
