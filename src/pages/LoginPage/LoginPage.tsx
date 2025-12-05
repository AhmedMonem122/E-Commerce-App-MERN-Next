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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <form
        action={formAction}
        className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 sm:p-10 space-y-6"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center">
          Welcome Back
        </h1>
        <p className="text-sm text-slate-500 text-center -mt-2 mb-6">
          Sign in to continue to your dashboard.
        </p>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className={`rounded-xl px-4 py-3 ${
              state?.validationErrors?.email ? "border-red-500" : ""
            }`}
            autoComplete="email"
          />
          {state?.validationErrors?.email && (
            <p className="mt-1 text-xs text-red-600">
              {state.validationErrors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`rounded-xl px-4 py-3 pr-10 ${
                state?.validationErrors?.password ? "border-red-500" : ""
              }`}
              autoComplete="current-password"
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {state?.validationErrors?.password && (
            <p className="mt-1 text-xs text-red-600">
              {state.validationErrors.password}
            </p>
          )}
        </div>

        {/* Submit */}
        <SubmitLoginButton />

        <p className="text-sm text-slate-500 text-center pt-3">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-600 hover:underline">
            Create one
          </a>
        </p>
      </form>
    </section>
  );
};

export default LoginPage;
