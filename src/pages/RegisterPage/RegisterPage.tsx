"use client";

import { registerAction } from "@/app/actions/auth/authActions";
import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import SubmitRegisterButton from "./SubmitRegisterButton";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [state, formAction] = useActionState(registerAction, {});

  // Show server-side validation errors under inputs
  const validationErrors = state?.validationErrors ?? {};

  // When state updates (success or failure), stop loading and show toast on error:
  useEffect(() => {
    if (state) {
      if (state.success === false && state.message) {
        // show backend message as toast
        toast.error(state.message);
      }
      // Note: on success we redirect server-side; we don't show toast here.
    }
  }, [state]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-slate-900">
          Create your account
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Join us — create a new account and get started.
        </p>

        <form action={formAction} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full name
            </label>
            <Input
              name="name"
              type="text"
              placeholder="John Doe"
              className="block w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            {validationErrors?.name && (
              <p className="mt-1 text-xs text-red-600">
                {validationErrors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="block w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            {validationErrors?.email && (
              <p className="mt-1 text-xs text-red-600">
                {validationErrors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                className="block w-full rounded-xl border border-slate-200 px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-9 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {validationErrors?.password && (
              <p className="mt-1 text-xs text-red-600">
                {validationErrors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                name="passwordConfirm"
                type={showPasswordConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                className="block w-full rounded-xl border border-slate-200 px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirm((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPasswordConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {validationErrors?.passwordConfirm && (
              <p className="mt-1 text-xs text-red-600">
                {validationErrors.passwordConfirm}
              </p>
            )}
          </div>
          {/* Submit */}
          <div>
            <SubmitRegisterButton />
          </div>

          {/* Backend message under form */}
          {state?.message && !state.success && (
            <p className="text-sm text-red-600 text-center">{state.message}</p>
          )}
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}
